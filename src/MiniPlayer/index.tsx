import React, { useContext, useState } from "react"
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTrackPlayerEvents } from "react-native-track-player/lib/hooks"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import styles from "./styles"

const MiniPlayer = () => {
  const insets = useSafeAreaInsets()

  const { track } = useContext(PodibleContext)
  const [playerState, setPlayerState] = useState<string>("")

  const pause = () => TrackPlayer.pause()
  const play = () => TrackPlayer.play()

  useTrackPlayerEvents(
    // @ts-ignore
    [TrackPlayer.TrackPlayerEvents.PLAYBACK_STATE],
    // @ts-ignore
    event => setPlayerState(event.state),
  )

  return Boolean(track) ? (
    <View
      testID="Mini Player"
      style={[
        styles.container,
        {
          marginBottom: insets.bottom,
        },
      ]}
    >
      <View style={{ width: 60 }} />
      <JumpBackwardButton />
      {playerState === "playing" && (
        <TouchableOpacity testID="Pause Button" onPress={pause}>
          <Ionicons name="ios-pause" size={50} color="black" />
        </TouchableOpacity>
      )}
      {playerState === "paused" && (
        <TouchableOpacity testID="Play Button" onPress={play}>
          <Ionicons name="ios-play" size={50} color="black" />
        </TouchableOpacity>
      )}
      {(playerState === "buffering" || playerState === "loading") && (
        <ActivityIndicator testID="Loading Spinner" size="large" />
      )}
      <JumpForwardButton />
      <Image
        testID="Currently Playing Artwork"
        source={{ uri: track.artwork }}
        style={styles.artwork}
      />
    </View>
  ) : null
}

export default MiniPlayer
