import React, {
  ReactElement,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react"
import { FlatList, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"
import { PodibleContext } from "../Provider"
import sortNewestEpisodesFirst from "./sortNewestEpisodesFirst"
import saveListeningProgressInRealm from "./saveListeningProgressInRealm"
import useEpisodesWithUpdatedSecondsListenedTo from "./useEpisodesWithUpdatedSecondsListenedTo"
import Loading from "../Loading"
import PodcastDescription from "./PodcastDescription"
import HeaderBarWithBackButton from "./HeaderBarWithBackButton"
import SomethingWentWrong from "../SomethingWentWrong"
import Episode from "./Episode"
import usePodcastFromRssFeed from "../hooks/usePodcastFromRssFeed"
import useStyles from "./useStyles"

type EpisodesProps = {
  route: RouteProp<RouteParams, "Episodes">
}

const Episodes = ({ route }: EpisodesProps): ReactElement => {
  const styles = useStyles()
  const insets = useSafeArea()
  const navigation = useNavigation()

  const everySecond = 1000
  const { position } = useTrackPlayerProgress(everySecond)
  const { episode: playingEpisode, playbackState } = useContext(PodibleContext)
  const [secondsListenedTo, setSecondsListenedTo] = useState<number>(
    playingEpisode ? playingEpisode.seconds_listened_to : 0,
  )

  const rssFeedUrl = route.params.rssFeedUrl
  const { podcast, didError, abortController } = usePodcastFromRssFeed({
    rssFeedUrl,
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      abortController.abort()
    })

    return unsubscribe
  }, [navigation, abortController])

  const podcastEpisodesExist = useMemo(() => podcast && podcast.episodes, [
    podcast,
  ])

  const newestEpisodesFirst = useMemo(
    () =>
      podcastEpisodesExist
        ? sortNewestEpisodesFirst(podcast.episodes)
        : undefined,
    [podcastEpisodesExist, podcast],
  )

  const {
    episodes: episodesWithUpdatedSecondsListenedTo,
  } = useEpisodesWithUpdatedSecondsListenedTo({
    episodes: newestEpisodesFirst,
    playingEpisode,
    secondsListenedTo,
  })

  const episodes = useMemo(() => {
    if (podcastEpisodesExist && playbackState === "playing") {
      return episodesWithUpdatedSecondsListenedTo
    } else if (podcastEpisodesExist) {
      return newestEpisodesFirst
    }
    return undefined
  }, [
    podcastEpisodesExist,
    playbackState,
    newestEpisodesFirst,
    episodesWithUpdatedSecondsListenedTo,
  ])

  useEffect(() => {
    const seekHasFinished = position > 0
    if (playingEpisode && seekHasFinished) {
      saveListeningProgressInRealm(playingEpisode, position)
      setSecondsListenedTo(position)
    }
  }, [position, playingEpisode])

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

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
