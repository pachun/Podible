import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import FastImage from "react-native-fast-image"
import useStyles from "./useStyles"

interface PodcastWithUnfinishedEpisodesProps {
  podcast: Podcast
  onPress: () => void
}

const PodcastWithUnfinishedEpisodes = ({
  podcast,
  onPress: showPodcastEpisodes,
}: PodcastWithUnfinishedEpisodesProps) => {
  const styles = useStyles()
  return (
    <TouchableOpacity style={styles.container} onPress={showPodcastEpisodes}>
      <View style={styles.background}>
        <FastImage style={styles.image} source={{ uri: podcast.artwork_url }} />
        <View style={styles.podcastInformation}>
          <Text style={styles.podcastTitle} numberOfLines={2}>
            {podcast.title}
          </Text>
          <View style={{ height: 5 }} />
          <Text style={styles.podcastPublisher} numberOfLines={2}>
            {podcast.publisher.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PodcastWithUnfinishedEpisodes
