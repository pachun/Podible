import Realm from "realm"
import apiUrl from "../shared/apiUrl"
import getExpoPushToken, {
  appHasExpoPushToken,
} from "../shared/getExpoPushToken"
import realmConfiguration from "../shared/realmConfiguration"

const getSubscribedPodcasts = (
  setSubscribedPodcasts: (podcasts: Podcast[]) => void,
): void => {
  const get = async () => {
    const realm = await Realm.open(realmConfiguration)
    const subscribedPodcastIds = Array.from(
      realm.objects<SubscribedPodcast>("SubscribedPodcast"),
    ).map(subscribedPodcast => subscribedPodcast.podcast_id)
    const subscribedPodcasts = Array.from(
      realm
        .objects<Podcast>("Podcast")
        .filter(podcast => subscribedPodcastIds.includes(podcast.id)),
    )

    if (await appHasExpoPushToken()) {
      const expoPushToken = await getExpoPushToken()
      const response = await fetch(
        `${apiUrl}/subscriptions?expo_push_token=${expoPushToken}`,
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      const previouslySubscribedPodcasts = (await response.json()).map(
        (subscription: Subscription) => subscription.podcast,
      )
      const subscribedPodcastsWithoutDuplicates = [
        ...subscribedPodcasts,
        ...previouslySubscribedPodcasts,
      ].reduce(
        (podcasts: Podcast[], podcast: Podcast) =>
          podcasts.map(podcast => podcast.id).includes(podcast.id)
            ? podcasts
            : [...podcasts, podcast],
        [],
      )
      setSubscribedPodcasts(subscribedPodcastsWithoutDuplicates)
    } else {
      setSubscribedPodcasts(subscribedPodcasts)
    }
  }
  get()
}

export default getSubscribedPodcasts
