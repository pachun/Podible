import React, { ReactElement, useState, useEffect, useContext } from "react"
import { Share, Text, TouchableOpacity, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import PlaybackRate_Artwork_Description_Carousel from "./PlaybackRate_Artwork_Description_Carousel"
import * as Haptics from "expo-haptics"
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "../JumpForwardButton"
import JumpBackwardButton from "../JumpBackwardButton"
import PlayPauseButton from "../PlayPauseButton"
import ScrubBar from "./ScrubBar"
import DownloadButton from "./DownloadButton"
import useColorScheme from "../hooks/useColorScheme"
import { playEpisode } from "../shared/trackPlayerHelpers"
import apiUrl from "../shared/apiUrl"
import useStyles from "./useStyles"

interface NowPlayingProps {
  route: RouteProp<RouteParams, "NowPlaying"> | undefined
}

const NowPlaying = ({ route }: NowPlayingProps): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const { currentlyPlayingEpisode, setSeekAfterNextPlayEvent } = useContext(
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
    if (route?.params?.playImmediately) {
      playEpisode(currentlyPlayingEpisode, setSeekAfterNextPlayEvent)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", vibrateAfterAnimationOut)

    return unsubscribe
  }, [navigation])

  const carouselRef = React.useRef()

  const [scrubValue, setScrubValue] = useState<number | undefined>()
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
          ref={carouselRef}
          episode={currentlyPlayingEpisode}
        />
      </View>
      <View style={styles.sliderContainer}>
        <ScrubBar scrubValue={scrubValue} setScrubValue={setScrubValue} />
      </View>
      <View style={styles.playbackControlsContainer}>
        <View style={styles.playbackControlsBackground}>
          <JumpBackwardButton />
          <PlayPauseButton
            iconSize={70}
            onPlay={() => setScrubValue(undefined)}
          />
          <JumpForwardButton />
        </View>
      </View>
      <View style={styles.alternativeControlsContainer}>
        <View style={styles.alternativeControlsBackground}>
          <TouchableOpacity
            hitSlop={{ left: 20, right: 20, top: 10 }}
            onPress={() => {
              if (carouselRef.current) {
                // @ts-ignore
                carouselRef.current.snapToItem(0)
              }
            }}
          >
            <FontAwesome5
              name="sliders-h"
              size={20}
              color={colorScheme.button}
            />
          </TouchableOpacity>
          <DownloadButton />
          <TouchableOpacity
            hitSlop={{ left: 20, right: 20, top: 10 }}
            onPress={() => {
              if (carouselRef.current) {
                // @ts-ignore
                carouselRef.current.snapToItem(2)
              }
            }}
          >
            <Entypo
              name="info-with-circle"
              size={20}
              color={colorScheme.button}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default React.memo(NowPlaying)
