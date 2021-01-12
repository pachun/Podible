import React, { useContext } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import { PodibleContext } from "../Provider"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"
import { play, pause } from "../AudioControls"

const PlayPauseButton = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const { episode, playbackState } = useContext(PodibleContext)

  const pauseEpisode = () => {
    Haptics.impactAsync()
    pause()
  }

  const playEpisode = () => {
    Haptics.impactAsync()
    play(episode)
  }

  return (
    <>
      {(playbackState === "playing" || playbackState === "ready") && (
        <TouchableOpacity onPress={pauseEpisode}>
          <Ionicons name="ios-pause" size={50} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {(playbackState === "paused" || playbackState === "idle") && (
        <TouchableOpacity onPress={playEpisode}>
          <Ionicons name="ios-play" size={50} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" || playbackState === "loading") && (
        <ActivityIndicator size="large" color={colorScheme.foreground} />
      )}
    </>
  )
}

export default PlayPauseButton
