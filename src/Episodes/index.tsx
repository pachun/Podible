import React, { useEffect } from "react"
import { FlatList, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import Loading from "../Loading"
import PodcastDescription from "./PodcastDescription"
import HeaderBarWithBackButton from "./HeaderBarWithBackButton"
import Episode from "./Episode"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import useStyles from "./useStyles"

type EpisodesProps = {
  route: RouteProp<RouteParams, "Episodes">
}

const Episodes = ({ route }: EpisodesProps) => {
  const styles = useStyles()
  const insets = useSafeArea()
  const navigation = useNavigation()

  const rssFeedUrl = route.params.podcastSearchResult.rssFeedUrl

  const { podcast, abortController } = usePodcastFromRssFeed({ rssFeedUrl })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      abortController.abort()
    })

    return unsubscribe
  }, [navigation])

  return (
    <View testID="Episodes" style={styles.container}>
      <View style={{ height: insets.top }} />
      <HeaderBarWithBackButton goBack={navigation.goBack} />
      {podcast ? (
        <FlatList
          style={styles.container}
          scrollIndicatorInsets={{ right: 1 }}
          ListHeaderComponent={<PodcastDescription podcast={podcast} />}
          ListFooterComponent={<View style={{ height: 30 }} />}
          data={podcast.episodes}
          keyExtractor={keyExtractor}
          renderItem={({ item: episode }) => <Episode episode={episode} />}
        />
      ) : (
        <Loading />
      )}
    </View>
  )
}

export default Episodes
