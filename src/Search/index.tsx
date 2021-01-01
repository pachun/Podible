import React, { useState } from "react"
import { FlatList, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import * as Amplitude from "expo-analytics-amplitude"
import { useNavigation } from "@react-navigation/native"
import PodcastSearchResult from "./PodcastSearchResult"
import SearchField from "./SearchField"
import useDebounce from "../hooks/useDebounce"
import usePodcastSearchResults from "../hooks/usePodcastSearchResults"
import useStyles from "./useStyles"

const Search = () => {
  const styles = useStyles()
  const navigation = useNavigation()
  const insets = useSafeArea()

  const [searchFieldText, setSearchFieldText] = useState<string>("")
  const debouncedSearchFieldText = useDebounce(searchFieldText, 500)

  const { podcastSearchResults } = usePodcastSearchResults({
    searchedText: debouncedSearchFieldText,
  })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  const showPodcastEpisodes = (
    podcastSearchResult: PodcastSearchResult,
  ) => () => {
    !__DEV__ &&
      Amplitude.logEventWithProperties("Viewed Episodes", podcastSearchResult)
    navigation.navigate("Episodes", { podcastSearchResult })
  }

  return (
    <View style={styles.container} testID="Search">
      <View style={{ height: insets.top }} />
      <View style={{ height: 20 }} />
      <View style={styles.searchFieldContainer}>
        <SearchField
          searchFieldText={searchFieldText}
          setSearchFieldText={setSearchFieldText}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.podcastSearchResultsList}
        data={podcastSearchResults}
        keyExtractor={keyExtractor}
        ListFooterComponent={<View style={{ height: 30 }} />}
        renderItem={({ item: podcastSearchResult }) => (
          <PodcastSearchResult
            podcastSearchResult={podcastSearchResult}
            onPress={showPodcastEpisodes(podcastSearchResult)}
          />
        )}
      />
    </View>
  )
}

export default Search
