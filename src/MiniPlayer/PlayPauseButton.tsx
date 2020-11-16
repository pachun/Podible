import React, { useContext } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../Provider"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

const PlayPauseButton = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const { playbackState } = useContext(PodibleContext)

  const pause = () => {
    Haptics.impactAsync()
    TrackPlayer.pause()
  }
  const play = () => {
    Haptics.impactAsync()
    TrackPlayer.play()
  }

  return (
    <>
      {(playbackState === "playing" || playbackState === "ready") && (
        <TouchableOpacity testID="Pause Button" onPress={pause}>
          <Ionicons name="ios-pause" size={50} color={colorScheme.foreground} />
        </TouchableOpacity>
      )}
      {playbackState === "paused" && (
        <TouchableOpacity testID="Play Button" onPress={play}>
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
