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
    pause(episode)
  }
  const playEpisode = () => {
    Haptics.impactAsync()
    play(episode)
  }

  return (
    <>
      {(playbackState === "playing" || playbackState === "ready") && (
        <TouchableOpacity testID="Pause Button" onPress={pauseEpisode}>
          <Ionicons name="ios-pause" size={50} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {playbackState === "paused" && (
        <TouchableOpacity testID="Play Button" onPress={playEpisode}>
          <Ionicons name="ios-play" size={50} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" ||
        playbackState === "loading" ||
        playbackState === "idle") && (
        <ActivityIndicator size="large" color={colorScheme.foreground} />
      )}
    </>
  )
}

export default PlayPauseButton
