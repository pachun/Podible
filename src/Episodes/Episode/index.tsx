import React, { useContext, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import * as Amplitude from "expo-analytics-amplitude"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../../Provider"
import trackPlayerTrackFromEpisode from "../../shared/trackPlayerTrackFromEpisode"
import humanReadableDuration from "./humanReadableDuration"
import shortDate from "./shortDate"
import styles from "./styles"

interface EpisodeProps {
  episode: Episode
}

const Episode = ({ episode }: EpisodeProps) => {
  const { setEpisode } = useContext(PodibleContext)
  const duration = useMemo(() => humanReadableDuration(episode.duration), [
    episode.duration,
  ])

  const play = () => {
    Amplitude.logEventWithProperties("Began Listening To Episode", { episode })
    TrackPlayer.stop()
    setEpisode(episode)
    TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
    TrackPlayer.play()
  }

  return (
    <TouchableOpacity onPress={play}>
      <View style={styles.container}>
        <View style={styles.background}>
          <Text numberOfLines={2} style={styles.title}>
            {episode.title}
          </Text>
          <View style={{ height: 5 }} />
          <Text numberOfLines={1} style={styles.dateAndDuration}>{`${shortDate(
            episode.publishedOn,
          )} · ${duration}`}</Text>
          <View style={{ height: 5 }} />
          <Text numberOfLines={2}>{episode.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Episode
