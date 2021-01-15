import React, { ReactElement } from "react"
import { Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import ShowHtml from "../../shared/ShowHtml"
import useStyles from "./useStyles"

interface PodcastDescriptionProps {
  podcast: Podcast
}

const PodcastDescription = ({
  podcast,
}: PodcastDescriptionProps): ReactElement => {
  const styles = useStyles()
  return (
    <>
      <View style={{ height: 20 }} />
      <View style={styles.podcastDetailsContainer}>
        <View style={styles.podcastDetailsBackground}>
          <FastImage
            style={styles.podcastArtwork}
            source={{ uri: podcast.artwork_url }}
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
            <ShowHtml html={podcast.description} />
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
    </>
  )
}

export default PodcastDescription
