import React, { createContext, useReducer, useState } from "react"
import reducer from "./reducer"

// @ts-ignore
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"

const shouldStopPlayback = (event: TrackPlayerEvents): boolean =>
  Boolean(event.permanent)

const shouldPausePlayback = (event: TrackPlayerEvents): boolean =>
  Boolean(event.paused)

const shouldResumePlayback = (event: TrackPlayerEvents): boolean =>
  !Boolean(event.paused) && !Boolean(event.permanent)

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
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState || defaultInitialState,
  )

  const [playbackState, setPlaybackState] = useState<string>("unknown")
  useTrackPlayerEvents(
    [TrackPlayerEvents.PLAYBACK_STATE, TrackPlayerEvents.REMOTE_DUCK],
    (event: TrackPlayerEvents) => {
      if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
        setPlaybackState(event.state)
      } else if (event.type === TrackPlayerEvents.REMOTE_DUCK) {
        if (shouldStopPlayback(event)) {
          TrackPlayer.stop()
        } else if (shouldPausePlayback(event)) {
          TrackPlayer.pause()
        } else if (shouldResumePlayback(event)) {
          TrackPlayer.play()
        }
      }
    },
  )

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
