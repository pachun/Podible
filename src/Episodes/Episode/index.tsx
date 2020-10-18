import React, { useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import humanReadableDuration from "./humanReadableDuration"
import shortDate from "./shortDate"
import styles from "./styles"

interface EpisodeProps {
  episode: Episode
}

const Episode = ({ episode }: EpisodeProps) => {
  const duration = useMemo(() => humanReadableDuration(episode.duration), [
    episode.duration,
  ])

  const play = () => {
    TrackPlayer.stop()
    const track = {
      id: episode.audioUrl,
      title: episode.title,
      artist: episode.publisher,
      artwork: episode.artworkUrl,
      url: episode.audioUrl,
    }
    TrackPlayer.add([track])
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