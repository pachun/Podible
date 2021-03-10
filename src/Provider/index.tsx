import React, { ReactElement, createContext, useReducer } from "react"
import reducer from "./reducer"
import useAudioEvents from "./useAudioEvents"

export const PodibleContext = createContext<PodibleContextType>(undefined)

const initialState: PodibleState = {
  trackPlayerState: "unstarted",
  playbackState: { name: "unstarted" },
  playbackRate: 1.0,
  seekAfterNextPlayEvent: false,
}

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const podibleContext: PodibleContextType = {
    trackPlayerState: state.trackPlayerState,
    setTrackPlayerState: (value: TrackPlayerState) =>
      dispatch({ type: "SET_TRACK_PLAYER_STATE", value }),

    playbackState: state.playbackState,
    setPlaybackState: (value: PlaybackState) =>
      dispatch({ type: "SET_PLAYBACK_STATE", value }),

    playbackRate: state.playbackRate,
    setPlaybackRate: (value: number) =>
      dispatch({ type: "SET_PLAYBACK_RATE", value }),

    seekAfterNextPlayEvent: state.seekAfterNextPlayEvent,
    setSeekAfterNextPlayEvent: (value: SeekAfterNextPlayEvent) =>
      dispatch({ type: "SET_SEEK_AFTER_NEXT_PLAY_EVENT", value }),
  }

  useAudioEvents(podibleContext)

  return (
    <PodibleContext.Provider value={podibleContext}>
      {children}
    </PodibleContext.Provider>
  )
}

export default Provider
