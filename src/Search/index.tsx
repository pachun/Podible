import React, { ReactElement, useMemo, useState, useEffect } from "react"
import { View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import getPodcastsWithUnfinishedEpisodes from "./getPodcastsWithUnfinishedEpisodes"
import { useNavigation } from "@react-navigation/native"
import PodcastSearchResults from "./PodcastSearchResults"
import PodcastsWithUnfinishedEpisodes from "./PodcastsWithUnfinishedEpisodes"
import SearchField from "./SearchField"
import useDebounce from "../hooks/useDebounce"
import usePodcastSearchResults from "../hooks/usePodcastSearchResults"
import useStyles from "./useStyles"

const Search = (): ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
  const insets = useSafeArea()

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

  const autoFocusSearchField = useMemo(
    () => podcastsWithUnfinishedEpisodes.length > 0,
    [podcastsWithUnfinishedEpisodes],
  )

  useEffect(() => {
    if (searchFieldText === "") {
      getPodcastsWithUnfinishedEpisodes(setPodcastsWithUnfinishedEpisodes)
    }
  }, [searchFieldText])

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={{ height: 20 }} />
      <View style={styles.searchFieldContainer}>
        <SearchField
          searchFieldText={searchFieldText}
          setSearchFieldText={setSearchFieldText}
          autoFocus={autoFocusSearchField}
        />
      </View>
      <PodcastSearchResults
        isVisible={Boolean(debouncedSearchFieldText)}
        podcastSearchResults={podcastSearchResults}
        onPress={showPodcastEpisodes}
      />
      <PodcastsWithUnfinishedEpisodes
        isVisible={
          !debouncedSearchFieldText && podcastsWithUnfinishedEpisodes.length > 0
        }
        podcastsWithUnfinishedEpisodes={podcastsWithUnfinishedEpisodes}
        onPress={showPodcastEpisodes}
      />
    </View>
  )
}

export default Search
