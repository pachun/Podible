import Realm from "realm"
import apiUrl, { apiRequestHeaders } from "../../shared/apiUrl"
import realmConfiguration from "../../shared/realmConfiguration"
import getExpoPushToken from "../../shared/getExpoPushToken"

const subscribeToPodcastInRealm = async (podcast: Podcast): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    realm.create("SubscribedPodcast", { podcast_id: podcast.id })
  })
}

const sendNotificationsWhenNewEpisodesComeOut = async (
  podcast: Podcast,
  expoPushToken: string,
) => {
  fetch(`${apiUrl}/subscriptions`, {
    method: "POST",
    headers: await apiRequestHeaders(),
    body: JSON.stringify({
      expo_push_token: expoPushToken,
      podcast_id: podcast.id,
    }),
  })
}

const subscribeToPodcast = async (podcast: Podcast): Promise<void> => {
  await subscribeToPodcastInRealm(podcast)
  const expoPushToken = await getExpoPushToken()
  if (expoPushToken) {
    await sendNotificationsWhenNewEpisodesComeOut(podcast, expoPushToken)
  }
}

export default subscribeToPodcast
