import React, { ReactElement, useState, useContext, useEffect } from "react"
import { FlatList, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import * as Animatable from "react-native-animatable"
import { PodibleContext } from "../Provider"
import Loading from "../Loading"
import PodcastDescription from "./PodcastDescription"
import HeaderBarWithBackButton from "./HeaderBarWithBackButton"
import SomethingWentWrong from "../SomethingWentWrong"
import Episode from "./Episode"
import usePodcastFromRssFeed from "./usePodcastFromRssFeed"
import useSecondsListenedTo from "./useSecondsListenedTo"
import useDisplayableEpisodes from "./useDisplayableEpisodes"
import useStyles from "./useStyles"

interface EpisodesProps {
  route: RouteProp<RouteParams, "Episodes">
}

const Episodes = ({ route }: EpisodesProps): ReactElement => {
  const styles = useStyles()
  const insets = useSafeArea()
  const navigation = useNavigation()

  const rssFeedUrl = route.params.rssFeedUrl
  const { podcast, didError, abortController } = usePodcastFromRssFeed({
    rssFeedUrl,
  })

  const cancelFetchPodcastNetworkRequest = () => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      abortController.abort()
    })
    return unsubscribe
  }

  useEffect(cancelFetchPodcastNetworkRequest, [navigation, abortController])

  const { currentlyPlayingEpisode, playbackState } = useContext(PodibleContext)

  const [secondsListenedTo, setSecondsListenedTo] = useState<number>(
    currentlyPlayingEpisode ? currentlyPlayingEpisode.seconds_listened_to : 0,
  )

  useSecondsListenedTo({
    playbackState,
    currentlyPlayingEpisode,
    setSecondsListenedTo,
  })

  const episodes = useDisplayableEpisodes({
    podcast,
    currentlyPlayingEpisode,
    secondsListenedTo,
    playbackState,
  })

  const keyExtractor = <T,>(_: T, position: number) => position.toString()

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <HeaderBarWithBackButton goBack={navigation.goBack} />
      {!episodes && !didError && <Loading />}
      {episodes && (
        <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
          <FlatList
            style={styles.container}
            scrollIndicatorInsets={{ right: 1 }}
            ListHeaderComponent={<PodcastDescription podcast={podcast} />}
            ListFooterComponent={<View style={{ height: 30 }} />}
            data={episodes}
            keyExtractor={keyExtractor}
            renderItem={({ item: episode }) => <Episode episode={episode} />}
          />
        </Animatable.View>
      )}
      {!episodes && didError && <SomethingWentWrong />}
    </View>
  )
}

export default React.memo(Episodes)
