import React, {
  ReactElement,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import { View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import getPodcastsWithUnfinishedEpisodes from "./getPodcastsWithUnfinishedEpisodes"
import getSubscribedPodcasts from "./getSubscribedPodcasts"
import PodcastSearchResults from "./PodcastSearchResults"
import MyPodcasts from "./MyPodcasts"
import SearchField from "./SearchField"
import useDebounce from "../hooks/useDebounce"
import usePodcastSearchResults from "./usePodcastSearchResults"
import useStyles from "./useStyles"

import useNotifications from "../hooks/useNotifications"

const Search = (): ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
  const insets = useSafeArea()
  const { setCurrentlyPlayingEpisode } = useContext(PodibleContext)

  useNotifications({ setCurrentlyPlayingEpisode, navigation })

  const [searchFieldText, setSearchFieldText] = useState<string>("")
  const debouncedSearchFieldText = useDebounce(searchFieldText, 500)

  const { podcastSearchResults } = usePodcastSearchResults({
    searchedText: debouncedSearchFieldText,
  })

  const showPodcastEpisodes = (rssFeedUrl: string) => () =>
    navigation.navigate("Episodes", {
      rssFeedUrl,
    })

  const [
    podcastsWithUnfinishedEpisodes,
    setPodcastsWithUnfinishedEpisodes,
  ] = useState<Podcast[]>([])

  const [subscribedPodcasts, setSubscribedPodcasts] = useState<Podcast[]>([])

  const recalculateMyPodcasts = () => {
    getPodcastsWithUnfinishedEpisodes(setPodcastsWithUnfinishedEpisodes)
    getSubscribedPodcasts(setSubscribedPodcasts)
  }

  useEffect(() => {
    if (searchFieldText === "") recalculateMyPodcasts()
  }, [searchFieldText])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      recalculateMyPodcasts()
    })

    return unsubscribe
  }, [navigation])

  const myPodcastsAreVisible = useMemo(
    () =>
      (!debouncedSearchFieldText || !searchFieldText) &&
      (podcastsWithUnfinishedEpisodes.length > 0 ||
        subscribedPodcasts.length > 0),
    [
      debouncedSearchFieldText,
      searchFieldText,
      podcastsWithUnfinishedEpisodes,
      subscribedPodcasts,
    ],
  )

  const podcastSearchResultsAreVisible = useMemo(
    () => Boolean(debouncedSearchFieldText) && Boolean(searchFieldText),
    [debouncedSearchFieldText, searchFieldText],
  )

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={{ height: 20 }} />
      <View style={styles.searchFieldContainer}>
        <SearchField
          searchFieldText={searchFieldText}
          setSearchFieldText={setSearchFieldText}
        />
      </View>
      <PodcastSearchResults
        isVisible={podcastSearchResultsAreVisible}
        podcastSearchResults={podcastSearchResults}
        onPress={showPodcastEpisodes}
      />
      <MyPodcasts
        isVisible={myPodcastsAreVisible}
        recentlyPlayedPodcasts={podcastsWithUnfinishedEpisodes}
        subscribedPodcasts={subscribedPodcasts}
        onPress={showPodcastEpisodes}
      />
    </View>
  )
}

export default Search
