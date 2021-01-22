import React, { ReactElement, createContext, useReducer, useState } from "react"
import reducer from "./reducer"

// @ts-ignore
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK

const wasPlayed = (event: TrackPlayerEvents): boolean =>
  event.type === whenPlayedOrPaused && event.state === "playing"

const wasPlayedOrPaused = (event: TrackPlayerEvents): boolean =>
  event.type === whenPlayedOrPaused

const shouldStopPlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.permanent)

const shouldPausePlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.paused)

const shouldResumePlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted && !event.paused && !event.permanent

const defaultInitialState: PodibleState = {
  playbackState: "unknown",
  playbackRate: 1.0,
}

export const PodibleContext = createContext<Partial<PodibleContextType>>({})

const Provider = ({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: PodibleState
}): ReactElement => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState || defaultInitialState,
  )

  const [playbackRate, setPlaybackRate] = useState<number>(1.0)
  const [playbackState, setPlaybackState] = useState<string>("unknown")

  const update = (event: TrackPlayerEvents) => {
    if (wasPlayed(event)) {
      TrackPlayer.setRate(playbackRate)
    }

    if (wasPlayedOrPaused(event)) {
      setPlaybackState(event.state)
    } else if (shouldStopPlayback(event)) {
      TrackPlayer.stop()
    } else if (shouldPausePlayback(event)) {
      TrackPlayer.pause()
    } else if (shouldResumePlayback(event)) {
      TrackPlayer.play()
    }
  }

  useTrackPlayerEvents([whenPlayedOrPaused, whenAudioIsInterrupted], update)

  const value: PodibleContextType = {
    currentlyPlayingEpisode: state.currentlyPlayingEpisode,
    setCurrentlyPlayingEpisode: (currentlyPlayingEpisode: Episode) =>
      dispatch({
        type: "SET_CURRENTLY_PLAYING_EPISODE",
        value: currentlyPlayingEpisode,
      }),
    playbackState,
    playbackRate,
    setPlaybackRate,
  }

  return (
    <PodibleContext.Provider value={value}>{children}</PodibleContext.Provider>
  )
}

export default Provider
