import React, { ReactElement, useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import { showMessage } from "react-native-flash-message"
import subscribeToPodcast from "./subscribeToPodcast"
import ShowHtml from "../../shared/ShowHtml"
import useStyles from "./useStyles"
import useSubscriptions from "./useSubscriptions"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

interface PodcastDescriptionProps {
  podcast: Podcast
}

const PodcastDescription = ({
  podcast,
}: PodcastDescriptionProps): ReactElement => {
  const styles = useStyles()
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  const removeSubscribeButton = () => setIsSubscribed(true)

  const subscribe = async () => {
    removeSubscribeButton()
    subscribeToPodcast(podcast)
    showMessage({
      message: `Subscribed to ${podcast.title}`,
      backgroundColor: colorScheme.button,
      icon: "success",
    })
  }

  useSubscriptions(podcast.id, setIsSubscribed)

  return (
    <>
      <View style={{ height: 20 }} />
      <View style={styles.podcastDetailsContainer}>
        <View style={styles.podcastDetailsBackground}>
          <FastImage
            style={styles.podcastArtwork}
            source={{ uri: podcast.artwork_url }}
          />
          <View style={styles.podcastDetails}>
            <Text style={styles.titleLabel} numberOfLines={2}>
              {podcast.title}
            </Text>
            <View style={{ height: 5 }} />
            <Text style={styles.publisherLabel} numberOfLines={2}>
              {podcast.publisher.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 20 }} />
      {Boolean(podcast.description) && (
        <>
          <View style={styles.podcastDescriptionContainer}>
            <View style={styles.podcastDescriptionBackground}>
              <Text style={styles.podcastDescriptionLabel}>
                <ShowHtml html={podcast.description} />
              </Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
        </>
      )}
      {!isSubscribed && (
        <>
          <View style={styles.subscribeButtonContainer}>
            <TouchableOpacity
              style={styles.subscribeButtonBackground}
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              onPress={subscribe}
            >
              <Text style={styles.subscribeButtonLabel}>SUBSCRIBE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </>
      )}
    </>
  )
}

export default PodcastDescription
