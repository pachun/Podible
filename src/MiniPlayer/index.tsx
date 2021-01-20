import React, { ReactElement, useContext } from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import { trackPlayerTrackFromEpisode } from "../shared/trackPlayerHelpers"
import PlayPauseButton from "./PlayPauseButton"
import useColorScheme from "../hooks/useColorScheme"
import useStyles from "./useStyles"

const MiniPlayer = (): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const showNowPlayingModal = () => {
    const vibrateAfterAnimationIn = () => setTimeout(Haptics.impactAsync, 270)

    navigation.navigate("Now Playing")
    vibrateAfterAnimationIn()
  }

  const { currentlyPlayingEpisode } = useContext(PodibleContext)
  const track =
    currentlyPlayingEpisode &&
    trackPlayerTrackFromEpisode(currentlyPlayingEpisode)

  return track ? (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.openNowPlayingModalButton}
          onPress={showNowPlayingModal}
        >
          <Entypo
            name="chevron-small-up"
            size={60}
            color={colorScheme.button}
          />
        </TouchableOpacity>
        <JumpBackwardButton />
        <PlayPauseButton />
        <JumpForwardButton />
        <TouchableOpacity
          onPress={showNowPlayingModal}
          hitSlop={{ left: 30, right: 30, top: 10, bottom: 10 }}
        >
          <FastImage source={{ uri: track.artwork }} style={styles.artwork} />
        </TouchableOpacity>
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
