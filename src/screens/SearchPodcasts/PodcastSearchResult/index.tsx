import React from "react"
import { Image, View, Text } from "react-native"
import styles from "./styles"

interface PodcastSearchResultProps {
  podcastSearchResult: PodcastSearchResult
}

const PodcastSearchResult = ({
  podcastSearchResult,
}: PodcastSearchResultProps) => (
  <View style={styles.container}>
    <View style={styles.background}>
      <Image
        testID="image"
        style={styles.image}
        source={{ uri: podcastSearchResult.imageUrl }}
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
  </View>
)

export default PodcastSearchResult
