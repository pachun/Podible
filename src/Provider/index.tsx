import React, { createContext, useReducer, useState, useEffect } from "react"
import reducer from "./reducer"

// @ts-ignore
import TrackPlayer, { TrackPlayerEvents } from "react-native-track-player"
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from "react-native-track-player/lib/hooks"

import Realm from "realm"
import realmConfiguration from "../realmConfiguration"

const saveListeningProgress = async (
  episode: Episode,
  secondsListenedTo: number,
) => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    const cachedEpisode = realm.objectForPrimaryKey<Episode>(
      "Episode",
      episode.audio_url,
    )
    cachedEpisode.seconds_listened_to = secondsListenedTo
  })
}

const whenPlayedOrPaused = TrackPlayerEvents.PLAYBACK_STATE
const whenAudioIsInterrupted = TrackPlayerEvents.REMOTE_DUCK

const wasPlayedOrPaused = (event: TrackPlayerEvents): boolean =>
  event.type === whenPlayedOrPaused

const shouldStopPlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.permanent)

const shouldPausePlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted && Boolean(event.paused)

const shouldResumePlayback = (event: TrackPlayerEvents): boolean =>
  event.type === whenAudioIsInterrupted &&
  !Boolean(event.paused) &&
  !Boolean(event.permanent)

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

  const everySecond = 1000
  const { position } = useTrackPlayerProgress(everySecond)

  useEffect(() => {
    if (state.episode && position > 0) {
      saveListeningProgress(state.episode, position)
    }
  }, [position, state.episode])

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
