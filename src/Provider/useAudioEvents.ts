import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"
import { jumpInterval } from "../shared/trackPlayerHelpers"

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK
const whenCarsSteeringWheelsSeekForwardButtonIsPressed = "remote-next"
const whenCarsSteeringWheelsSeekBackwardButtonIsPressed = "remote-previous"

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

const useAudioEvents = (
  playbackRate: number,
  setPlaybackState: (playbackState: string) => void,
): void => {
  useTrackPlayerEvents(
    [
      whenPlayedOrPaused,
      whenAudioIsInterrupted,
      whenCarsSteeringWheelsSeekForwardButtonIsPressed,
      whenCarsSteeringWheelsSeekBackwardButtonIsPressed,
    ],
    (event: TrackPlayerEvent) => {
      if (wasPlayed(event)) {
        TrackPlayer.setRate(playbackRate)
      }

      if (carSteeringWheelsSeekForwardButtonWasPressed(event)) {
        seekForward()
      } else if (carSteeringWheelsSeekBackwardButtonWasPressed(event)) {
        seekBackward()
      }

      if (wasPlayedOrPaused(event)) {
        const playbackState = event.state
        setPlaybackState(playbackState)
      } else if (shouldStopPlayback(event)) {
        TrackPlayer.stop()
      } else if (shouldPausePlayback(event)) {
        TrackPlayer.pause()
      } else if (shouldResumePlayback(event)) {
        TrackPlayer.play()
      }
    },
  )
}

export default useAudioEvents
