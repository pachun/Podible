import Realm from "realm"
import apiUrl, { apiRequestHeaders } from "../../shared/apiUrl"
import realmConfiguration from "../../shared/realmConfiguration"
import getExpoPushToken from "../../shared/getExpoPushToken"

const subscribeToPodcastInRealm = async (
  subscription: Subscription,
): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    realm.create("Subscription", subscription)
  })
}

const sendNotificationsWhenNewEpisodesComeOut = async (
  podcast: Podcast,
  expoPushToken: string,
): Promise<Subscription> => {
  const request = await fetch(`${apiUrl}/subscriptions`, {
    method: "POST",
    headers: await apiRequestHeaders(),
    body: JSON.stringify({
      expo_push_token: expoPushToken,
      podcast_id: podcast.id,
    }),
  })
  return await request.json()
}

const subscribeToPodcast = async (podcast: Podcast): Promise<void> => {
  const expoPushToken = await getExpoPushToken()
  if (expoPushToken) {
    const subscription = await sendNotificationsWhenNewEpisodesComeOut(
      podcast,
      expoPushToken,
    )
    await subscribeToPodcastInRealm(subscription)
  }
}

export default subscribeToPodcast
