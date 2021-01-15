import React, { ReactElement } from "react"
import { FlatList, Text, View } from "react-native"
import PodcastWithUnfinishedEpisodes from "./PodcastWithUnfinishedEpisodes"
import useStyles from "./useStyles"

interface PodcastsWithUnfinishedEpisodesProps {
  isVisible: boolean
  podcastsWithUnfinishedEpisodes: Podcast[]
  onPress: (rssFeedUrl: string) => () => void
}

const PodcastsWithUnfinishedEpisodes = ({
  isVisible,
  podcastsWithUnfinishedEpisodes,
  onPress: showPodcastEpisodes,
}: PodcastsWithUnfinishedEpisodesProps): ReactElement => {
  const styles = useStyles()

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    isVisible && (
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.list}
        data={podcastsWithUnfinishedEpisodes}
        keyExtractor={keyExtractor}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.headerBackground}>
              <Text style={styles.headerTitle}>RECENTLY PLAYED</Text>
            </View>
          </View>
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
        renderItem={({ item: podcast }) => (
          <PodcastWithUnfinishedEpisodes
            podcast={podcast}
            onPress={showPodcastEpisodes(podcast.rss_feed_url)}
          />
        )}
      />
    )
  )
}

export default PodcastsWithUnfinishedEpisodes
