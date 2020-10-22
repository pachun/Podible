import React, { useContext } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../Provider"

const PlayPauseButton = () => {
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
          <Ionicons name="ios-pause" size={50} color="black" />
        </TouchableOpacity>
      )}
      {playbackState === "paused" && (
        <TouchableOpacity testID="Play Button" onPress={play}>
          <Ionicons name="ios-play" size={50} color="black" />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" ||
        playbackState === "loading" ||
        playbackState === "idle") && (
        <ActivityIndicator testID="Loading Spinner" size="large" />
      )}
    </>
  )
}

export default PlayPauseButton
