import React, { ReactElement, useMemo, useContext } from "react"
import { SectionList, Text, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import { PodibleContext } from "../../Provider"
import useDebounce from "../../hooks/useDebounce"
import MyPodcast from "./MyPodcast"
import useStyles from "./useStyles"

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
  const insets = useSafeArea()

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
  const listSectionsDebounced = useDebounce(listSections, 1000)

  const { currentlyPlayingEpisode: isShowingMiniPlayer } = useContext(
    PodibleContext,
  )

  return (
    isVisible && (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <SectionList
          style={styles.list}
          sections={listSectionsDebounced}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="always"
          ListFooterComponent={
            isShowingMiniPlayer ? null : (
              <View style={{ height: insets.bottom }} />
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerContainer}>
              <View style={styles.headerBackground}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
            </View>
          )}
          renderItem={({ item: podcast }) => (
            <MyPodcast
              podcast={podcast}
              onPress={showPodcastEpisodes(podcast.rss_feed_url)}
            />
          )}
        />
      </Animatable.View>
    )
  )
}

export default React.memo(MyPodcasts)
