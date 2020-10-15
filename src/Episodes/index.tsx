import React from "react"
import { FlatList, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import PodcastDescription from "./PodcastDescription"
import Episode from "./Episode"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"

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
        ListHeaderComponent={<PodcastDescription podcast={podcast} />}
        data={podcast.episodes}
        keyExtractor={keyExtractor}
        renderItem={({ item: episode }) => <Episode episode={episode} />}
      />
    </View>
  ) : null
}

export default Episodes
