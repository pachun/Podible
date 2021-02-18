import React, { ReactElement, useEffect, useContext } from "react"
import { Share, Text, TouchableOpacity, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import PlaybackRate_Artwork_Description_Carousel from "./PlaybackRate_Artwork_Description_Carousel"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "../JumpForwardButton"
import JumpBackwardButton from "../JumpBackwardButton"
import PlayPauseButton from "../PlayPauseButton"
import ScrubBar from "./ScrubBar"
import useColorScheme from "../hooks/useColorScheme"
import usePlayEffect from "./usePlayEffect"
import apiUrl from "../shared/apiUrl"
import useStyles from "./useStyles"

interface NowPlayingProps {
  route: RouteProp<RouteParams, "NowPlaying"> | undefined
}

const NowPlaying = ({ route }: NowPlayingProps): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const { currentlyPlayingEpisode, setPlaybackRate } = useContext(
    PodibleContext,
  )
  const goBack = () => navigation.goBack()

  const vibrateAfterAnimationOut = () => setTimeout(Haptics.impactAsync, 200)

  const share = async () => {
    await Share.share({
      url: `${apiUrl}/share?episode_id=${currentlyPlayingEpisode.id}`,
    })
  }

  useEffect(() => {
    if (!route?.params?.isCurrentTrack) {
      setPlaybackRate(1.0)
    }
  }, []) // eslint-disable-line

  usePlayEffect(
    currentlyPlayingEpisode,
    route?.params?.playImmediately,
    route?.params?.isCurrentTrack,
  )

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
            size={50}
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
        <TouchableOpacity onPress={share} style={styles.headerButtonContainer}>
          <Entypo
            name="share-alternative"
            size={26}
            color={colorScheme.button}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
      <View style={styles.carouselContainer}>
        <PlaybackRate_Artwork_Description_Carousel
          episode={currentlyPlayingEpisode}
        />
      </View>
      <View style={styles.sliderContainer}>
        <ScrubBar />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controlsBackground}>
          <JumpBackwardButton />
          <PlayPauseButton iconSize={70} />
          <JumpForwardButton />
        </View>
      </View>
    </View>
  )
}

export default NowPlaying
