import React, { ReactElement } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import PodibleImage from "../../../PodibleImage"
import useStyles from "./useStyles"

interface MyPodcastProps {
  podcast: Podcast
  onPress: () => void
}

const MyPodcast = ({
  podcast,
  onPress: showPodcastEpisodes,
}: MyPodcastProps): ReactElement => {
  const styles = useStyles()
  return (
    <TouchableOpacity style={styles.container} onPress={showPodcastEpisodes}>
      <View style={styles.background}>
        <PodibleImage style={styles.image} url={podcast.artwork_url} />
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

export default MyPodcast
