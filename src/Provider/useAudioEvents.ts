import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"
import { jumpInterval } from "../shared/trackPlayerHelpers"

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK
const whenCarSteeringWheelsSeekForwardButtonIsPressed = "remote-next"
const whenCarSteeringWheelsSeekBackwardButtonIsPressed = "remote-previous"

const wasPlayed = (event: TrackPlayerEvent): boolean =>
  event.type === whenPlayedOrPaused && event.state === "playing"

const wasPlayedOrPaused = (event: TrackPlayerEvent): boolean =>
  event.type === whenPlayedOrPaused

const shouldStopPlayback = (event: TrackPlayerEvent): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.permanent)

const shouldPausePlayback = (event: TrackPlayerEvent): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.paused)

const shouldResumePlayback = (event: TrackPlayerEvent): boolean =>
  event.type === whenAudioIsInterrupted && !event.paused && !event.permanent

const carSteeringWheelsSeekForwardButtonWasPressed = (
  event: TrackPlayerEvent,
): boolean => event.type === "remote-next"

const carSteeringWheelsSeekBackwardButtonWasPressed = (
  event: TrackPlayerEvent,
): boolean => event.type === "remote-previous"

const seekForward = async () => {
  const position = await TrackPlayer.getPosition()
  await TrackPlayer.seekTo(position + jumpInterval)
}

const seekBackward = async () => {
  const position = await TrackPlayer.getPosition()
  await TrackPlayer.seekTo(position - jumpInterval)
}

const resetPlaybackRateWhenNewTracksArePlayed = (
  event: TrackPlayerEvent,
  podibleContext: PodibleContextType,
) => {
  if (wasPlayed(event)) {
    setTimeout(() => TrackPlayer.setRate(podibleContext.playbackRate), 200)
  }
}

const respondToButtonsPressedOnCarSteeringWheels = (
  event: TrackPlayerEvent,
) => {
  if (carSteeringWheelsSeekForwardButtonWasPressed(event)) {
    seekForward()
  } else if (carSteeringWheelsSeekBackwardButtonWasPressed(event)) {
    seekBackward()
  }
}

const seekToLastListenProgressWhenPlayed = (
  event: TrackPlayerEvent,
  podibleContext: PodibleContextType,
) => {
  if (wasPlayed(event) && podibleContext.seekAfterNextPlayEvent) {
    const { seekTo, preSeekVolume } = podibleContext.seekAfterNextPlayEvent
    podibleContext.setSeekAfterNextPlayEvent(false)
    TrackPlayer.seekTo(seekTo)
    TrackPlayer.play()
    setTimeout(() => {
      TrackPlayer.setVolume(preSeekVolume)
    }, 500)
  }
}

const pauseForAudioInterruptionsLikeTurnByTurnNavigation = (
  event: TrackPlayerEvent,
) => {
  if (shouldStopPlayback(event)) {
    TrackPlayer.stop()
  } else if (shouldPausePlayback(event)) {
    TrackPlayer.pause()
  } else if (shouldResumePlayback(event)) {
    TrackPlayer.play()
  }
}

const updatePlaybackState = (
  event: TrackPlayerEvent,
  podibleContext: PodibleContextType,
) => {
  if (wasPlayedOrPaused(event)) {
    const playbackState = event.state
    podibleContext.setPlaybackState(playbackState)
  }
}

const useAudioEvents = (podibleContext: PodibleContextType): void => {
  useTrackPlayerEvents(
    [
      whenPlayedOrPaused,
      whenAudioIsInterrupted,
      whenCarSteeringWheelsSeekForwardButtonIsPressed,
      whenCarSteeringWheelsSeekBackwardButtonIsPressed,
    ],
    (event: TrackPlayerEvent) => {
      updatePlaybackState(event, podibleContext)
      seekToLastListenProgressWhenPlayed(event, podibleContext)
      respondToButtonsPressedOnCarSteeringWheels(event)
      resetPlaybackRateWhenNewTracksArePlayed(event, podibleContext)
      pauseForAudioInterruptionsLikeTurnByTurnNavigation(event)
    },
  )
}

export default useAudioEvents
