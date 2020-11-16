import React, { createContext, useReducer, useState } from "react"
import reducer from "./reducer"

import TrackPlayer from "react-native-track-player"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"

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
    // @ts-ignore
    [TrackPlayer.TrackPlayerEvents.PLAYBACK_STATE],
    // @ts-ignore
    event => setPlaybackState(event.state),
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
