import React, { ReactElement, useContext } from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../Provider"
import { playEpisode } from "../shared/trackPlayerHelpers"
import useColorScheme from "../hooks/useColorScheme"

interface PlayPauseButtonProps {
  iconSize?: number
  onPlay?: () => void
}

const PlayPauseButton = ({
  iconSize = 50,
  onPlay = () => {},
}: PlayPauseButtonProps): ReactElement => {
  const colorScheme = useColorScheme()

  const {
    currentlyPlayingEpisode,
    playbackState,
    setSeekAfterNextPlayEvent,
  } = useContext(PodibleContext)

  const pauseEpisode = () => {
    Haptics.impactAsync()
    TrackPlayer.pause()
  }

  const play = async () => {
    Haptics.impactAsync()
    onPlay()
    playEpisode(currentlyPlayingEpisode, setSeekAfterNextPlayEvent)
  }

  return (
    <>
      {playbackState === "playing" && (
        <TouchableOpacity onPress={pauseEpisode}>
          <Ionicons
            name="ios-pause"
            size={iconSize}
            color={colorScheme.button}
          />
        </TouchableOpacity>
      )}
      {(playbackState === "paused" ||
        playbackState === "idle" ||
        playbackState === "ready") && (
        <TouchableOpacity onPress={play}>
          <Ionicons
            name="ios-play"
            size={iconSize}
            color={colorScheme.button}
          />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" || playbackState === "loading") && (
        <ActivityIndicator size="large" color={colorScheme.button} />
      )}
    </>
  )
}

export default React.memo(PlayPauseButton)
