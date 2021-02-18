import Realm from "realm"
import apiUrl, { apiRequestHeaders } from "../shared/apiUrl"
import realmConfiguration from "../shared/realmConfiguration"

const getSubscribedPodcasts = async (
  setSubscribedPodcasts: (podcasts: Podcast[]) => void,
): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  const subscribedPodcastIds = Array.from(
    realm.objects<SubscribedPodcast>("SubscribedPodcast"),
  ).map(subscribedPodcast => subscribedPodcast.podcast_id)
  const subscribedPodcasts = Array.from(
    realm
      .objects<Podcast>("Podcast")
      .filter(podcast => subscribedPodcastIds.includes(podcast.id)),
  )

  const response = await fetch(`${apiUrl}/subscriptions`, {
    headers: await apiRequestHeaders(),
  })
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
}

export default getSubscribedPodcasts
