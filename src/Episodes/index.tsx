import React from "react"
import { Image, Text, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import styles from "./styles"

type PodcastEpisodesProps = {
  route: RouteProp<RouteParams, "Episodes">
}

const PodcastEpisodes = ({ route }: PodcastEpisodesProps) => {
  const { podcast } = usePodcastFromRssFeed({
    rssFeedUrl: route.params.podcastSearchResult.rssFeedUrl,
  })

  return podcast ? (
    <View testID="Episodes">
      <View style={{ height: 20 }} />
      <View style={styles.podcastDetailsContainer}>
        <View style={styles.podcastDetailsBackground}>
          <Image
            style={styles.podcastArtwork}
            testID="Podcast Artwork"
            source={{ uri: podcast.artworkUrl }}
          />
          <View style={styles.podcastDetails}>
            <Text style={styles.titleLabel} numberOfLines={2}>
              {podcast.title}
            </Text>
            <View style={{ height: 5 }} />
            <Text style={styles.publisherLabel} numberOfLines={2}>
              {podcast.publisher.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 10 }} />
      <View style={styles.podcastDescriptionContainer}>
        <View style={styles.podcastDescriptionBackground}>
          <Text style={styles.podcastDescriptionLabel}>
            {podcast.description}
          </Text>
        </View>
      </View>
    </View>
  ) : null
}

export default PodcastEpisodes
