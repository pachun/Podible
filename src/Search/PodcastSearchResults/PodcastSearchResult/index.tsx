import React, { ReactElement } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import PodibleImage from "../../../PodibleImage"
import useStyles from "./useStyles"

interface PodcastSearchResultProps {
  podcastSearchResult: PodcastSearchResult
  onPress: () => void
}

const PodcastSearchResult = ({
  podcastSearchResult,
  onPress: showPodcastEpisodes,
}: PodcastSearchResultProps): ReactElement => {
  const styles = useStyles()
  return (
    <TouchableOpacity style={styles.container} onPress={showPodcastEpisodes}>
      <View style={styles.background}>
        <PodibleImage
          style={styles.image}
          url={podcastSearchResult.artworkUrl}
        />
        <View style={styles.podcastInformation}>
          <Text style={styles.podcastTitle} numberOfLines={2}>
            {podcastSearchResult.title}
          </Text>
          <View style={{ height: 5 }} />
          <Text style={styles.podcastPublisher} numberOfLines={2}>
            {podcastSearchResult.publisher.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(PodcastSearchResult)
