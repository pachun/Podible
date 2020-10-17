import React, { useState } from "react"
import { FlatList, TextInput, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import PodcastSearchResult from "./PodcastSearchResult"
import usePodcastSearchResults from "../hooks/usePodcastSearchResults"
import styles from "./styles"

interface SearchProps {
  navigation: NavigationProp
}

const Search = ({ navigation }: SearchProps) => {
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
        <View style={styles.searchFieldBackground}>
          <View style={styles.searchIconContainer}>
            <Ionicons name="ios-search" size={24} color="#b6b4ba" />
          </View>
          <TextInput
            testID="Search Field"
            placeholder="Search"
            style={styles.searchField}
            value={searchFieldText}
            onChangeText={setSearchFieldText}
          />
        </View>
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

export default Search
