import React, { ReactElement, createContext, useReducer, useState } from "react"
import reducer from "./reducer"

// @ts-ignore
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK

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

  const [playbackState, setPlaybackState] = useState<string>("unknown")

  const update = (event: TrackPlayerEvents) => {
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
    episode: state.episode,
    setEpisode: (episode: Episode) =>
      dispatch({ type: "SET_EPISODE", value: episode }),
    playbackState,
  }

  return (
    <PodibleContext.Provider value={value}>{children}</PodibleContext.Provider>
  )
}

export default Provider
