import React, { ReactElement, useContext } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import { PodibleContext } from "../Provider"
import useColorScheme from "../hooks/useColorScheme"
import { play, pause } from "../shared/trackPlayerHelpers"

const PlayPauseButton = (): ReactElement => {
  const colorScheme = useColorScheme()

  const { currentlyPlayingEpisode, playbackState } = useContext(PodibleContext)

  const pauseEpisode = () => {
    Haptics.impactAsync()
    pause()
  }

  const playEpisode = () => {
    Haptics.impactAsync()
    play(currentlyPlayingEpisode)
  }

  return (
    <>
      {(playbackState === "playing" || playbackState === "ready") && (
        <TouchableOpacity onPress={pauseEpisode}>
          <Ionicons name="ios-pause" size={50} color={colorScheme.button} />
        </TouchableOpacity>
      )}
      {(playbackState === "paused" || playbackState === "idle") && (
        <TouchableOpacity onPress={playEpisode}>
          <Ionicons name="ios-play" size={50} color={colorScheme.button} />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" || playbackState === "loading") && (
        <ActivityIndicator size="large" color={colorScheme.button} />
      )}
    </>
  )
}

export default PlayPauseButton
