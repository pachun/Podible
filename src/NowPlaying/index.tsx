import React, { ReactElement, useEffect, useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import PlaybackRate_Artwork_Description_Carousel from "./PlaybackRate_Artwork_Description_Carousel"
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
import useStyles from "./useStyles"

const NowPlaying = (): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const { episode } = useContext(PodibleContext)
  const insets = useSafeArea()
  const goBack = () => navigation.goBack()
  const hasNotch = insets.bottom > 0

  const vibrateAfterAnimationOut = () => setTimeout(Haptics.impactAsync, 200)

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", vibrateAfterAnimationOut)

    return unsubscribe
  }, [navigation])

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
      <View style={styles.carouselContainer}>
        <PlaybackRate_Artwork_Description_Carousel episode={episode} />
      </View>

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
