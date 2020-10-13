import React from "react"
import { Image, Text, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import styles from "./styles"

type PodcastEpisodesProps = {
  route: RouteProp<RouteParams, "Podcast Episodes">
}

const PodcastEpisodes = ({ route }: PodcastEpisodesProps) => {
  const { podcast } = usePodcastFromRssFeed({
    rssFeedUrl: route.params.podcastSearchResult.rssFeedUrl,
  })

  return podcast ? (
    <View testID="Podcast Episodes Screen">
      <View style={{ height: 20 }} />
      <View style={styles.podcastDetailsContainer}>
        <View style={styles.podcastDetailsBackground}>
          <Image
            style={styles.podcastArtwork}
            testID="Podcast Artwork"
            source={{ uri: podcast.artworkUrl }}
          />
          <View style={styles.podcastDetails}>
            <Text testID="Podcast Publisher" style={styles.publisherLabel}>
              {podcast.publisher.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 10 }} />
      <View style={styles.podcastDescriptionContainer}>
        <View style={styles.podcastDescriptionBackground}>
          <Text
            testID="Podcast Description"
            style={styles.podcastDescriptionLabel}
          >
            {podcast.description}
          </Text>
        </View>
      </View>
    </View>
  ) : null
}

export default PodcastEpisodes
