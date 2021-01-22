import React, { ReactElement, useState, useRef } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import FastImage from "react-native-fast-image"
import * as Animatable from "react-native-animatable"
import { showMessage } from "react-native-flash-message"
import subscribeToPodcast from "./subscribeToPodcast"
import SeeMore from "react-native-see-more-inline"
import useStyles from "./useStyles"
import useSubscriptions from "./useSubscriptions"
import useColorScheme from "../../hooks/useColorScheme"

interface PodcastDescriptionProps {
  podcast: Podcast
}

const PodcastDescription = ({
  podcast,
}: PodcastDescriptionProps): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  const removeSubscribeButton = () => setIsSubscribed(true)

  const subscribeButtonRef = useRef<Animatable.View & View>()

  const subscribe = async () => {
    Haptics.impactAsync()
    subscribeToPodcast(podcast)
    showMessage({
      message: `Subscribed to ${podcast.title}`,
      backgroundColor: colorScheme.button,
      icon: "success",
    })
    await subscribeButtonRef.current.bounceOut()
    removeSubscribeButton()
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
              <SeeMore
                numberOfLines={3}
                style={styles.podcastDescriptionLabel}
                linkColor={colorScheme.button}
                linkStyle={{ fontWeight: "bold" }}
                seeMoreText="more"
                seeLessText=""
              >
                {podcast.description}
              </SeeMore>
            </View>
          </View>
          <View style={{ height: 10 }} />
        </>
      )}
      {!isSubscribed && (
        <Animatable.View ref={subscribeButtonRef}>
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
        </Animatable.View>
      )}
    </>
  )
}

export default PodcastDescription
