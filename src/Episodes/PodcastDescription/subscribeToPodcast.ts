import Realm from "realm"
import realmConfiguration from "../../realmConfiguration"
import getExpoPushToken from "./getExpoPushToken"

const subscribeToPodcastInRealm = async (podcast: Podcast): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    realm.create("SubscribedPodcast", { podcast_id: podcast.id })
  })
}

const apiUrl = __DEV__
  ? `http://${process.env.REACT_NATIVE_API_URL}:3000`
  : `https://podible-web.herokuapp.com`

const sendNotificationsWhenNewEpisodesComeOut = async (
  podcast: Podcast,
  expoPushToken: string,
) => {
  fetch(`${apiUrl}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
