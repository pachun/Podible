import Realm from "realm"
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
    setSubscribedPodcasts(subscribedPodcasts)
  }
  get()
}

export default getSubscribedPodcasts
