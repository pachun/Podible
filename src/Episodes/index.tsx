import React from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import PodcastDescription from "./PodcastDescription"
import Episode from "./Episode"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import styles from "./styles"

type EpisodesProps = {
  route: RouteProp<RouteParams, "Episodes">
}

const Episodes = ({ route }: EpisodesProps) => {
  const { podcast } = usePodcastFromRssFeed({
    rssFeedUrl: route.params.podcastSearchResult.rssFeedUrl,
  })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return podcast ? (
    <View testID="Episodes">
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        ListHeaderComponent={<PodcastDescription podcast={podcast} />}
        ListFooterComponent={<View style={{ height: 30 }} />}
        data={podcast.episodes}
        keyExtractor={keyExtractor}
        renderItem={({ item: episode }) => <Episode episode={episode} />}
      />
    </View>
  ) : (
    <View style={styles.loadingSpinnerContainer}>
      <ActivityIndicator size="large" testID="Loading Spinner" />
    </View>
  )
}

export default Episodes
