import React from "react"
import { Image, View, TouchableOpacity, Text } from "react-native"
import styles from "./styles"

interface PodcastSearchResultProps {
  podcastSearchResult: PodcastSearchResult
  onPress: () => void
}

const PodcastSearchResult = ({
  podcastSearchResult,
  onPress: showPodcastEpisodes,
}: PodcastSearchResultProps) => (
  <TouchableOpacity style={styles.container} onPress={showPodcastEpisodes}>
    <View style={styles.background}>
      <Image
        testID="Podcast Artwork"
        style={styles.image}
        source={{ uri: podcastSearchResult.artworkUrl }}
      />
      <View style={styles.podcastInformation}>
        <Text style={styles.podcastTitle} numberOfLines={2}>
          {podcastSearchResult.title}
        </Text>
        <Text style={styles.podcastPublisher} numberOfLines={2}>
          {podcastSearchResult.publisher.toUpperCase()}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default PodcastSearchResult