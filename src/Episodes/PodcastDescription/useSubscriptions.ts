import { useEffect } from "react"
import Realm from "realm"
import realmConfiguration from "../../shared/realmConfiguration"

const useSubscriptions = (
  podcastId: number,
  setIsSubscribed: (isSubscribed: boolean) => void,
): void => {
  useEffect(() => {
    const getIsSubscribed = async () => {
      const realm = await Realm.open(realmConfiguration)
      const subscribedPodcastIds = Array.from(
        realm.objects<SubscribedPodcast>("SubscribedPodcast"),
      ).map(subscribedPodcast => subscribedPodcast.podcast_id)
      setIsSubscribed(subscribedPodcastIds.includes(podcastId))
    }
    getIsSubscribed()
  }, [podcastId, setIsSubscribed])
}

export default useSubscriptions
