import React, {
  ReactElement,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import getPodcastsWithUnfinishedEpisodes from "./getPodcastsWithUnfinishedEpisodes"
import getSubscribedPodcasts from "./getSubscribedPodcasts"
import PodcastSearchResults from "./PodcastSearchResults"
import MyPodcasts from "./MyPodcasts"
import SearchField from "./SearchField"
import EmptyStateCoachingMarks from "./EmptyStateCoachingMarks"
import useDebounce from "../hooks/useDebounce"
import usePodcastSearchResults from "./usePodcastSearchResults"
import useStyles from "./useStyles"

import useNotifications from "../hooks/useNotifications"

const Search = (): ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
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

  // do not flash empty state when launched
  type Showing =
    | "Podcast Search Results"
    | "My Podcasts"
    | "Empty State Coaching Marks"
  const [isFirstRender, setIsFirstRender] = useState(true)
  const showing: Showing = useMemo(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return "My Podcasts"
    } else if (myPodcastsAreVisible) {
      return "My Podcasts"
    } else if (podcastSearchResultsAreVisible) {
      return "Podcast Search Results"
    } else {
      return "Empty State Coaching Marks"
    }
  }, [myPodcastsAreVisible, podcastSearchResultsAreVisible, isFirstRender])
  const showingDebounced = useDebounce(showing, 1)

  return (
    <View style={styles.container}>
      <View style={styles.searchFieldContainer}>
        <SearchField
          searchFieldText={searchFieldText}
          setSearchFieldText={setSearchFieldText}
          grabAttention={
            !podcastSearchResultsAreVisible && !myPodcastsAreVisible
          }
        />
      </View>
      <PodcastSearchResults
        isVisible={showingDebounced === "Podcast Search Results"}
        podcastSearchResults={podcastSearchResults}
        onPress={showPodcastEpisodes}
      />
      <MyPodcasts
        isVisible={showingDebounced === "My Podcasts"}
        recentlyPlayedPodcasts={podcastsWithUnfinishedEpisodes}
        subscribedPodcasts={subscribedPodcasts}
        onPress={showPodcastEpisodes}
      />
      <EmptyStateCoachingMarks
        isVisible={showingDebounced === "Empty State Coaching Marks"}
      />
    </View>
  )
}

export default Search
