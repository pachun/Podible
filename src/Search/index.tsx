import React, { useState } from "react"
import { FlatList, TextInput, View } from "react-native"
import PodcastSearchResult from "./PodcastSearchResult"
import usePodcastSearchResults from "../hooks/usePodcastSearchResults"
import styles from "./styles"

interface SearchPodcastProps {
  navigation: NavigationProp
}

const SearchPodcasts = ({ navigation }: SearchPodcastProps) => {
  const [searchFieldText, setSearchFieldText] = useState<string>("")

  const { podcastSearchResults } = usePodcastSearchResults({
    searchedText: searchFieldText,
  })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  const showPodcastEpisodes = (
    podcastSearchResult: PodcastSearchResult,
  ) => () => navigation.navigate("Episodes", { podcastSearchResult })

  return (
    <View style={styles.container} testID="Search">
      <View style={{ height: 20 }} />
      <View style={styles.searchFieldContainer}>
        <TextInput
          testID="Search Field"
          placeholder="Search"
          style={styles.searchField}
          value={searchFieldText}
          onChangeText={setSearchFieldText}
        />
      </View>
      <FlatList
        style={styles.podcastSearchResultsList}
        data={podcastSearchResults}
        keyExtractor={keyExtractor}
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

export default SearchPodcasts
