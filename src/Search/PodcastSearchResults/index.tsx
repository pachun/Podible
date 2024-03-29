import React, { ReactElement } from "react"
import { FlatList, View } from "react-native"
import * as Animatable from "react-native-animatable"
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
}: PodcastSearchResultsProps): ReactElement => {
  const styles = useStyles()

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    isVisible && (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <FlatList
          keyboardShouldPersistTaps="always"
          style={styles.list}
          data={podcastSearchResults}
          keyExtractor={keyExtractor}
          ListFooterComponent={<View style={{ height: 30 }} />}
          renderItem={({ item: podcastSearchResult }) => (
            <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
              <PodcastSearchResult
                podcastSearchResult={podcastSearchResult}
                onPress={showPodcastEpisodes(podcastSearchResult.rssFeedUrl)}
              />
            </Animatable.View>
          )}
        />
      </Animatable.View>
    )
  )
}

export default React.memo(PodcastSearchResults)
