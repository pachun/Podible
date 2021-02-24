import Realm from "realm"
import apiUrl, { apiRequestHeaders } from "../shared/apiUrl"
import realmConfiguration from "../shared/realmConfiguration"

const syncRealmSubscriptionsWithNetworkSubscriptions = async (
  realmSubscribedPodcastIds: number[],
  networkSubscriptions: Subscription[],
) => {
  const subscriptionsNotInRealm = networkSubscriptions.filter(
    networkSubscription =>
      !realmSubscribedPodcastIds.includes(networkSubscription.podcast_id),
  )
  const realm = await Realm.open(realmConfiguration)
  subscriptionsNotInRealm.forEach(async subscriptionNotInRealm => {
    realm.write(async () => {
      realm.create("Subscription", subscriptionNotInRealm)
    })
  })
}

const getSubscribedPodcasts = async (
  setSubscribedPodcasts: (podcasts: Podcast[]) => void,
): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  const realmSubscribedPodcastIds = Array.from(
    realm.objects<Subscription>("Subscription"),
  ).map(realmSubscription => realmSubscription.podcast_id)

  const networkSubscriptions: Subscription[] = await (
    await fetch(`${apiUrl}/subscriptions`, {
      headers: await apiRequestHeaders(),
    })
  ).json()
  const networkSubscribedPodcastIds: number[] = networkSubscriptions.map(
    (networkSubscription: Subscription) => networkSubscription.podcast_id,
  )

  syncRealmSubscriptionsWithNetworkSubscriptions(
    realmSubscribedPodcastIds,
    networkSubscriptions,
  )

  const subscribedPodcastIdsWithoutDuplicates: number[] = [
    ...realmSubscribedPodcastIds,
    ...networkSubscribedPodcastIds,
  ].reduce(
    (subscribedPodcastIds, podcastId) =>
      subscribedPodcastIds.includes(podcastId)
        ? subscribedPodcastIds
        : [...subscribedPodcastIds, podcastId],
    [],
  )

  const subscribedPodcasts = subscribedPodcastIdsWithoutDuplicates.map(
    podcastId => realm.objectForPrimaryKey<Podcast>("Podcast", podcastId),
  )

  setSubscribedPodcasts(subscribedPodcasts)
}

export default getSubscribedPodcasts
