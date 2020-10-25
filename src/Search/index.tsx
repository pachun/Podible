import React, { useState } from "react"
import { FlatList, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Amplitude from "expo-analytics-amplitude"
import { useNavigation } from "@react-navigation/native"
import PodcastSearchResult from "./PodcastSearchResult"
import usePodcastSearchResults from "../hooks/usePodcastSearchResults"
import styles from "./styles"

const Search = () => {
  const navigation = useNavigation()

  const [searchFieldText, setSearchFieldText] = useState<string>("")

  const { podcastSearchResults } = usePodcastSearchResults({
    searchedText: searchFieldText,
  })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  const showPodcastEpisodes = (
    podcastSearchResult: PodcastSearchResult,
  ) => () => {
    !__DEV__ &&
      Amplitude.logEventWithProperties("Viewed Episodes", podcastSearchResult)
    navigation.navigate("Episodes", { podcastSearchResult })
  }

  const clearSearchFieldText = () => setSearchFieldText("")

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
            returnKeyType="search"
            autoCorrect={false}
          />
          {searchFieldText !== "" && (
            <TouchableOpacity
              onPress={clearSearchFieldText}
              testID="Clear Search Text Button"
              style={styles.clearSearchFieldTextButton}
            >
              <MaterialIcons name="cancel" size={26} color="#b6b4ba" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
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
