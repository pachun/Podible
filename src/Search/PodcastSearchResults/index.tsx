import React from "react"
import { FlatList, View } from "react-native"
import PodcastSearchResult from "./PodcastSearchResult"
import useStyles from "./useStyles"

interface PodcastSearchResultsProps {
  isVisible: boolean
  podcastSearchResults: PodcastSearchResult[]
  onPress: (rssFeedUrl: string) => () => void
}

const PodcastSearchResults = ({
  isVisible,
  podcastSearchResults,
  onPress: showPodcastEpisodes,
}: PodcastSearchResultsProps) => {
  const styles = useStyles()

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    isVisible && (
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.list}
        data={podcastSearchResults}
        keyExtractor={keyExtractor}
        ListFooterComponent={<View style={{ height: 30 }} />}
        renderItem={({ item: podcastSearchResult }) => (
          <PodcastSearchResult
            podcastSearchResult={podcastSearchResult}
            onPress={showPodcastEpisodes(podcastSearchResult.rssFeedUrl)}
          />
        )}
      />
    )
  )
}

export default PodcastSearchResults
