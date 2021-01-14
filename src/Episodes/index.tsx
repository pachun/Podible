import React, { useMemo, useEffect } from "react"
import { FlatList, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import parseISO from "date-fns/parseISO"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import Loading from "../Loading"
import PodcastDescription from "./PodcastDescription"
import HeaderBarWithBackButton from "./HeaderBarWithBackButton"
import SomethingWentWrong from "../SomethingWentWrong"
import Episode from "./Episode"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import useStyles from "./useStyles"

const newestEpisodesFirst = (episodes: Episode[]) =>
  Array.from(episodes).sort((e1, e2) =>
    parseISO(e1.published_at) > parseISO(e2.published_at) ? -1 : 1,
  )

type EpisodesProps = {
  route: RouteProp<RouteParams, "Episodes">
}

const Episodes = ({ route }: EpisodesProps) => {
  const styles = useStyles()
  const insets = useSafeArea()
  const navigation = useNavigation()

  const rssFeedUrl = route.params.rssFeedUrl

  const { podcast, didError, abortController } = usePodcastFromRssFeed({
    rssFeedUrl,
  })

  const episodes = useMemo(
    () =>
      podcast && podcast.episodes
        ? newestEpisodesFirst(podcast.episodes)
        : undefined,
    [podcast],
  )

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      abortController.abort()
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <HeaderBarWithBackButton goBack={navigation.goBack} />
      {!episodes && !didError && <Loading />}
      {episodes && (
        <FlatList
          style={styles.container}
          scrollIndicatorInsets={{ right: 1 }}
          ListHeaderComponent={<PodcastDescription podcast={podcast} />}
          ListFooterComponent={<View style={{ height: 30 }} />}
          data={episodes}
          keyExtractor={keyExtractor}
          renderItem={({ item: episode }) => <Episode episode={episode} />}
        />
      )}
      {didError && <SomethingWentWrong />}
    </View>
  )
}

export default Episodes
