import React, { ReactElement, useMemo, useContext } from "react"
import { Text, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { useSafeArea } from "react-native-safe-area-context"
import { SwipeListView } from "react-native-swipe-list-view"
import { PodibleContext } from "../../Provider"
import useDebounce from "../../hooks/useDebounce"
import MyPodcast from "./MyPodcast"
import RemoveRowUnderlay from "./RemoveRowUnderlay"
import useStyles from "./useStyles"

interface MyPodcastsProps {
  isVisible: boolean
  recentlyPlayedPodcasts: Podcast[]
  subscribedPodcasts: Podcast[]
  onPress: (rssFeedUrl: string) => () => void
  recalculateMyPodcasts: () => void
}

const MyPodcasts = ({
  isVisible,
  recentlyPlayedPodcasts,
  subscribedPodcasts,
  onPress: showPodcastEpisodes,
  recalculateMyPodcasts,
}: MyPodcastsProps): ReactElement => {
  const styles = useStyles()
  const insets = useSafeArea()

  const keyExtractor = (podcast: Podcast) => podcast.id.toString()

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

  const { playbackState } = useContext(PodibleContext)
  const isShowingMiniPlayer = ["playing", "paused"].includes(playbackState.name)

  return (
    isVisible && (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <SwipeListView
          useSectionList
          style={styles.list}
          sections={listSectionsDebounced}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="always"
          ListFooterComponent={
            isShowingMiniPlayer ? null : (
              <View style={{ height: insets.bottom }} />
            )
          }
          // @ts-ignore
          renderHiddenItem={({ item, section }, rowRefsByKey) => {
            const podcastRelation =
              section.title === "SUBSCRIPTIONS"
                ? "subscription"
                : "recently played"
            const podcast = item as Podcast
            const closeRow = () => {
              rowRefsByKey[(item as Podcast).id].closeRow()
            }
            return (
              <RemoveRowUnderlay
                podcast={podcast}
                podcastRelation={podcastRelation}
                onCancellationConfirmation={closeRow}
                afterRemove={recalculateMyPodcasts}
              />
            )
          }}
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
          rightOpenValue={-100}
          stopRightSwipe={-100}
          disableRightSwipe={true}
          tension={200}
          friction={40}
        />
      </Animatable.View>
    )
  )
}

export default React.memo(MyPodcasts)
