import React from "react"
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"
import { jumpInterval } from "../shared/trackPlayerHelpers"
import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK
const whenCarSteeringWheelsSeekForwardButtonIsPressed = "remote-next"
const whenCarSteeringWheelsSeekBackwardButtonIsPressed = "remote-previous"

const wasPlayed = (event: TrackPlayerEvent): boolean =>
  event.type === whenPlayedOrPaused && event.state === "playing"

const wasPaused = (event: TrackPlayerEvent): boolean =>
  event.type === whenPlayedOrPaused && event.state === "paused"

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

const respondToButtonsPressedOnCarSteeringWheel = (event: TrackPlayerEvent) => {
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

const updateTracksFinishedState = async (
  event: TrackPlayerEvent,
  podibleContext: PodibleContextType,
) => {
  if (wasPaused(event)) {
    // start changing this to use context

    const duration = await TrackPlayer.getDuration()
    const secondsRemaining =
      duration - podibleContext.currentlyPlayingEpisode.seconds_listened_to
    if (secondsRemaining <= 2) {
      const realm = await Realm.open(realmConfiguration)
      const episode = realm.objectForPrimaryKey<Episode>(
        "Episode",
        podibleContext.currentlyPlayingEpisode.audio_url,
      )
      realm.write(() => {
        episode.has_finished = true
      })
    }
  }
}

const updateContextState = async (
  event: TrackPlayerEvent,
  podibleContext: PodibleContextType,
) => {
  if (wasPlayedOrPaused(event)) {
    const trackPlayerState = event.state as "playing" | "paused"
    podibleContext.setTrackPlayerState(trackPlayerState)

    const playbackState = podibleContext.playbackState as
      | PlayingPlaybackState
      | PausedPlaybackState
    podibleContext.setPlaybackState({
      name: trackPlayerState,
      episodesAudioUrl: playbackState.episodesAudioUrl,
      secondsListenedTo: playbackState.secondsListenedTo,
      secondDuration: playbackState.secondDuration,
    })
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
      updateContextState(event, podibleContext)
      seekToLastListenProgressWhenPlayed(event, podibleContext)
      respondToButtonsPressedOnCarSteeringWheel(event)
      resetPlaybackRateWhenNewTracksArePlayed(event, podibleContext)
      pauseForAudioInterruptionsLikeTurnByTurnNavigation(event)
      updateTracksFinishedState(event, podibleContext)
    },
  )

  React.useEffect(() => {
    console.log(podibleContext.playbackState)
  }, [podibleContext.playbackState])
}

export default useAudioEvents
