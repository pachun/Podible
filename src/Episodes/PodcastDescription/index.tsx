import React from "react"
import { Image, Text, View } from "react-native"
import styles from "./styles"

interface PodcastDescriptionProps {
  podcast: Podcast
}

const PodcastDescription = ({ podcast }: PodcastDescriptionProps) => (
  <>
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
    <View style={{ height: 20 }} />
  </>
)

export default PodcastDescription
