import React, { ReactElement, useEffect, useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import PlaybackRate_Artwork_Description_Carousel from "./PlaybackRate_Artwork_Description_Carousel"
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
  const { currentlyPlayingEpisode } = useContext(PodibleContext)
  const goBack = () => navigation.goBack()

  const vibrateAfterAnimationOut = () => setTimeout(Haptics.impactAsync, 200)

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", vibrateAfterAnimationOut)

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.headerButtonContainer}>
          <Entypo
            name="chevron-small-down"
            size={60}
            color={colorScheme.button}
          />
        </TouchableOpacity>
        <View style={styles.episodeAndPodcastTitlesContainer}>
          <Text numberOfLines={1} style={styles.episodeTitle}>
            {currentlyPlayingEpisode.title}
          </Text>
          <Text numberOfLines={1} style={styles.podcastTitle}>
            {currentlyPlayingEpisode.podcast[0].title}
          </Text>
        </View>
        <View style={styles.headerButtonContainer} />
      </View>
      <View style={{ height: 40 }} />
      <View style={styles.carouselContainer}>
        <PlaybackRate_Artwork_Description_Carousel
          episode={currentlyPlayingEpisode}
        />
      </View>
      <View style={styles.sliderContainer}>
        <TrackPlayerSlider colorScheme={colorScheme} />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controlsBackground}>
          <JumpBackwardButton />
          <PlayPauseButton />
          <JumpForwardButton />
        </View>
      </View>
    </View>
  )
}

export default NowPlaying
