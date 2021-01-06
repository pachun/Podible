import React, { useContext } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import trackPlayerTrackFromEpisode from "../shared/trackPlayerTrackFromEpisode"
import PlayPauseButton from "./PlayPauseButton"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"
import useStyles from "./useStyles"

const MiniPlayer = () => {
  const styles = useStyles()
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const { episode } = useContext(PodibleContext)
  const track = episode && trackPlayerTrackFromEpisode(episode)

  return Boolean(track) ? (
    <>
      <View testID="Mini Player" style={styles.container}>
        <TouchableOpacity
          style={{ width: 60, justifyContent: "center", alignItems: "center" }}
          testID="Show Episode Details"
          onPress={() => {
            Haptics.impactAsync()
            navigation.navigate("Details")
          }}
        >
          <Entypo
            name="chevron-small-up"
            size={60}
            color={colorScheme.foreground}
          />
        </TouchableOpacity>
        <JumpBackwardButton />
        <PlayPauseButton />
        <JumpForwardButton />
        <FastImage
          testID="Currently Playing Artwork"
          source={{ uri: track.artwork }}
          style={styles.artwork}
        />
      </View>
      <View
        style={{
          height: insets.bottom,
          backgroundColor: colorScheme.background,
        }}
      />
    </>
  ) : null
}

export default MiniPlayer
