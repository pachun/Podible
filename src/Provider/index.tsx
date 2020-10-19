import React from "react"
import { useReducer, createContext } from "react"
import reducer from "./reducer"

const defaultInitialState: PodibleState = {}

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
  const value: PodibleContextType = {
    track: state.track,
    setTrack: (track: Track) => dispatch({ type: "SET_TRACK", value: track }),
  }
  return (
    <PodibleContext.Provider value={value}>{children}</PodibleContext.Provider>
  )
}

export default Provider
