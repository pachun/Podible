import React, { ReactElement, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { SwipeListView } from "react-native-swipe-list-view"
import { Ionicons } from "@expo/vector-icons"
import MyPodcast from "./MyPodcast"
import useStyles from "./useStyles"
import useColorScheme from "../../hooks/useColorScheme"

interface MyPodcastsProps {
  isVisible: boolean
  recentlyPlayedPodcasts: Podcast[]
  subscribedPodcasts: Podcast[]
  onPress: (rssFeedUrl: string) => () => void
}

const MyPodcasts = ({
  isVisible,
  recentlyPlayedPodcasts,
  subscribedPodcasts,
  onPress: showPodcastEpisodes,
}: MyPodcastsProps): ReactElement => {
  const styles = useStyles()

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  const recentlyPlayedPodcastsListSection = useMemo(() => {
    if (recentlyPlayedPodcasts.length === 0) {
      return []
    } else {
      return [{ title: "RECENTLY PLAYED", data: recentlyPlayedPodcasts }]
    }
  }, [recentlyPlayedPodcasts])

  const subscribedPodcastsListSection = useMemo(() => {
    if (subscribedPodcasts.length === 0) {
      return []
    } else {
      return [{ title: "SUBSCRIPTIONS", data: subscribedPodcasts }]
    }
  }, [subscribedPodcasts])

  const listSections = useMemo(
    () => [
      ...subscribedPodcastsListSection,
      ...recentlyPlayedPodcastsListSection,
    ],
    [recentlyPlayedPodcastsListSection, subscribedPodcastsListSection],
  )

  const unsubscribe = (podcast: Podcast) => {
    console.log(`unsubscribing from ${podcast.title}`)
  }

  const colorScheme = useColorScheme()
  return (
    isVisible && (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <SwipeListView
          useSectionList
          style={styles.list}
          sections={listSections}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="always"
          ListFooterComponent={<View style={{ height: 30 }} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerContainer}>
              <View style={styles.headerBackground}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => {
            const podcast = item as Podcast
            return (
              <MyPodcast
                podcast={podcast}
                onPress={showPodcastEpisodes(podcast.rss_feed_url)}
              />
            )
          }}
          renderHiddenItem={({ item }) => {
            const podcast = item as Podcast
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: colorScheme.tableHeader,
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingRight: 30,
                }}
                onPress={() => unsubscribe(podcast)}
              >
                <Ionicons name="trash-outline" size={30} color="#fff" />
              </TouchableOpacity>
            )
          }}
          rightOpenValue={-100}
          stopLeftSwipe={0.1}
        />
      </Animatable.View>
    )
  )
}

export default MyPodcasts
