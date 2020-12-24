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

  const pauseEpisode = async () => {
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
        <TouchableOpacity
          testID="Pause Button"
          onPress={pauseEpisode}
          style={{ marginTop: -20 }}
        >
          <Ionicons name="ios-pause" size={80} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {playbackState === "paused" && (
        <TouchableOpacity
          testID="Play Button"
          onPress={playEpisode}
          style={{ marginTop: -20 }}
        >
          <Ionicons name="ios-play" size={80} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" ||
        playbackState === "loading" ||
        playbackState === "idle") && (
        <ActivityIndicator color={colorScheme.foreground} size="large" />
      )}
    </>
  )
}

export default PlayPauseButton
