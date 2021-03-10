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
import useShareLinks from "../hooks/useShareLinks"

const Search = (): ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
  const { setPlaybackState } = useContext(PodibleContext)

  // move these into the provider (requires navigation access there)
  useShareLinks(setPlaybackState, navigation)
  useNotifications(setPlaybackState, navigation)

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
  const [isRecalculatingMyPodcasts, setIsRecalculatingMyPodcasts] = useState(
    true,
  )

  const recalculateMyPodcasts = async () => {
    setIsRecalculatingMyPodcasts(true)
    getPodcastsWithUnfinishedEpisodes(setPodcastsWithUnfinishedEpisodes)
    await getSubscribedPodcasts(setSubscribedPodcasts)
    setIsRecalculatingMyPodcasts(false)
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
        isVisible={podcastSearchResultsAreVisible}
        podcastSearchResults={podcastSearchResults}
        onPress={showPodcastEpisodes}
      />
      <MyPodcasts
        isVisible={myPodcastsAreVisible}
        recentlyPlayedPodcasts={podcastsWithUnfinishedEpisodes}
        subscribedPodcasts={subscribedPodcasts}
        onPress={showPodcastEpisodes}
        recalculateMyPodcasts={recalculateMyPodcasts}
      />
      <EmptyStateCoachingMarks
        isVisible={
          !podcastSearchResultsAreVisible &&
          !myPodcastsAreVisible &&
          !isRecalculatingMyPodcasts
        }
      />
    </View>
  )
}

export default React.memo(Search)
