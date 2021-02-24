import React, { ReactElement } from "react"
import { Alert, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Realm from "realm"
import realmConfiguration from "../../../shared/realmConfiguration"
import useColorScheme from "../../../hooks/useColorScheme"
import apiUrl, { apiRequestHeaders } from "../../../shared/apiUrl"

interface UnsubscribeRowUnderlay {
  podcast: Podcast
  podcastRelation: "subscription" | "recently played"
  onCancellationConfirmation: () => void
  afterRemove: () => void
}

const RemovePodcastUnderlay = ({
  podcast,
  podcastRelation,
  onCancellationConfirmation,
  afterRemove,
}: UnsubscribeRowUnderlay): ReactElement => {
  const colorScheme = useColorScheme()

  const unsubscribe = async () => {
    const realm = await Realm.open(realmConfiguration)
    const realmSubscription = realm
      .objects<Subscription>("Subscription")
      .filtered(`podcast_id = ${podcast.id}`)[0]

    const subscriptionId = realmSubscription.id
    realm.write(() => {
      realm.delete(realmSubscription)
    })
    await fetch(`${apiUrl}/subscriptions/${subscriptionId}`, {
      headers: await apiRequestHeaders(),
      method: "DELETE",
    })
    afterRemove()
  }

  const confirmUnsubscribe = () => {
    Alert.alert(
      `Unsubscribe from ${podcast.title}?`,
      `You will no longer receive new episode notifications and cached episodes will be removed.`,
      [
        {
          text: "Cancel",
          onPress: onCancellationConfirmation,
        },
        {
          text: "Unusbscribe",
          onPress: unsubscribe,
        },
      ],
    )
  }

  const removeFromRecentlyPlayed = async () => {
    const realm = await Realm.open(realmConfiguration)
    realm.write(() =>
      podcast.episodes.forEach(episode => (episode.seconds_listened_to = 0)),
    )
    afterRemove()
  }

  const remove = () => {
    if (podcastRelation === "subscription") {
      confirmUnsubscribe()
    } else if (podcastRelation === "recently played") {
      removeFromRecentlyPlayed()
    }
  }

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
      onPress={remove}
    >
      <Ionicons name="trash-outline" size={30} color={colorScheme.button} />
    </TouchableOpacity>
  )
}

export default RemovePodcastUnderlay
