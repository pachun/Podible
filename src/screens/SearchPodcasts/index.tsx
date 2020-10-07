import React, { useState } from "react"
import { FlatList, TextInput, View } from "react-native"
import PodcastSearchResult from "./PodcastSearchResult"
import searchPodcasts from "./searchPodcasts"
import styles from "./styles"

const SearchPodcasts = () => {
  const [searchFieldText, setSearchFieldText] = useState<string>("")
  const [podcastSearchResults, setPodcastSearchResults] = useState<
    PodcastSearchResult[]
  >([])

  const search = async () =>
    setPodcastSearchResults(await searchPodcasts(searchFieldText))

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20 }} />
      <View style={styles.searchFieldContainer}>
        <TextInput
          testID="searchField"
          placeholder="Search"
          style={styles.searchField}
          value={searchFieldText}
          onChangeText={setSearchFieldText}
          onSubmitEditing={search}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={podcastSearchResults}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <PodcastSearchResult podcastSearchResult={item} />
        )}
      />
    </View>
  )
}

export default SearchPodcasts
