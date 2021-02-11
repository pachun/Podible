import React, { ReactElement, createContext, useReducer } from "react"
import reducer from "./reducer"
import useAudioEvents from "./useAudioEvents"

export const PodibleContext = createContext<PodibleContextType>(undefined)

const initialState: PodibleState = {
  playbackState: "unknown",
  playbackRate: 1.0,
}

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useAudioEvents(state.playbackRate, (value: string) =>
    dispatch({ type: "SET_PLAYBACK_STATE", value }),
  )

  const value: PodibleContextType = {
    currentlyPlayingEpisode: state.currentlyPlayingEpisode,
    setCurrentlyPlayingEpisode: (value: Episode) =>
      dispatch({
        type: "SET_CURRENTLY_PLAYING_EPISODE",
        value,
      }),

    playbackState: state.playbackState,

    playbackRate: state.playbackRate,
    setPlaybackRate: (value: number) =>
      dispatch({ type: "SET_PLAYBACK_RATE", value }),
  }

  return (
    <PodibleContext.Provider value={value}>{children}</PodibleContext.Provider>
  )
}

export default Provider
