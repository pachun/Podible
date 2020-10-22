import React, { useContext } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import trackPlayerTrackFromEpisode from "../shared/trackPlayerTrackFromEpisode"
import PlayPauseButton from "./PlayPauseButton"
import styles from "./styles"

const MiniPlayer = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const { episode } = useContext(PodibleContext)
  const track = episode && trackPlayerTrackFromEpisode(episode)

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
      <TouchableOpacity
        style={{ width: 60, justifyContent: "center", alignItems: "center" }}
        testID="Show Episode Details"
        onPress={() => {
          Haptics.impactAsync()
          navigation.navigate("Details")
        }}
      >
        <Entypo name="chevron-small-up" size={60} color="black" />
      </TouchableOpacity>
      <JumpBackwardButton />
      <PlayPauseButton />
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
