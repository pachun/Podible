import React, { ReactElement } from "react"
import { FlatList, View } from "react-native"
import PodcastSearchResult from "./PodcastSearchResult"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"
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
}: PodcastSearchResultsProps): ReactElement => {
  const styles = useStyles()
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    isVisible && (
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.list}
        data={podcastSearchResults}
        keyExtractor={keyExtractor}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View
            style={{ height: 20, backgroundColor: colorScheme.background }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
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
