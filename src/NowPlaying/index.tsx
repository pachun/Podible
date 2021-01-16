import React, { ReactElement, useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useSafeArea } from "react-native-safe-area-context"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import PlayPauseButton from "./PlayPauseButton"
import TrackPlayerSlider from "./TrackPlayerSlider"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"
import useStyles from "./useStyles"

const NowPlaying = (): ReactElement => {
  const styles = useStyles()
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]
  const navigation = useNavigation()
  const { episode } = useContext(PodibleContext)
  const insets = useSafeArea()
  const goBack = () => {
    Haptics.impactAsync()
    navigation.goBack()
  }
  const hasNotch = insets.bottom > 0

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goBack}
        style={[styles.backButton, hasNotch ? { height: 100 } : {}]}
      >
        <Entypo
          name="chevron-small-down"
          size={60}
          color={colorScheme.button}
        />
      </TouchableOpacity>
      {hasNotch && <View style={{ height: 20 }} />}
      <FastImage source={{ uri: episode.artwork_url }} style={styles.artwork} />

      {hasNotch ? (
        <View style={{ height: 50 }} />
      ) : (
        <View style={{ height: 20 }} />
      )}
      <View style={styles.titleAndPublisherContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {episode.title}
        </Text>
        {hasNotch && <View style={{ height: 20 }} />}
        <Text numberOfLines={1} style={styles.publisher}>
          {episode.publisher}
        </Text>
      </View>
      {hasNotch && <View style={{ height: 30 }} />}
      <View style={styles.sliderContainer}>
        <TrackPlayerSlider colorScheme={colorScheme} />
      </View>
      <View style={{ height: 20 }} />
      <View style={styles.playbackControlsContainer}>
        <JumpBackwardButton />
        <PlayPauseButton />
        <JumpForwardButton />
      </View>
    </View>
  )
}

export default NowPlaying
