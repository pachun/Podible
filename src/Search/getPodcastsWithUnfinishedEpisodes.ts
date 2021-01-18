import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"

const isDuplicate = (
  podcastsWithUnfinishedEpisodes: Podcast[],
  podcast: Podcast,
) => {
  const rssFeedUrls = podcastsWithUnfinishedEpisodes.map(
    podcastWithUnfinishedEpisodes => podcastWithUnfinishedEpisodes.rss_feed_url,
  )
  return rssFeedUrls.includes(podcast.rss_feed_url)
}

const removingDuplicates = (
  podcastsWithUnfinishedEpisodes: Podcast[],
  podcast: Podcast,
): Podcast[] => {
  return [
    ...podcastsWithUnfinishedEpisodes,
    ...(isDuplicate(podcastsWithUnfinishedEpisodes, podcast) ? [] : [podcast]),
  ]
}

const isSubscribedTo = (
  podcast: Podcast,
  subscribedPodcastIds: number[],
): boolean => subscribedPodcastIds.includes(podcast.id)

const removingSubscribed = (subscribedPodcastIds: number[]) => (
  podcastsWithUnfinishedEpisodes: Podcast[],
  podcast: Podcast,
): Podcast[] => {
  return [
    ...podcastsWithUnfinishedEpisodes,
    ...(isSubscribedTo(podcast, subscribedPodcastIds) ? [] : [podcast]),
  ]
}

const getPodcastsWithUnfinishedEpisodes = async (
  setPodcastsWithUnfinishedEpisodes: (podcasts: Podcast[]) => void,
): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)

  const startedEpisodes = Array.from(
    realm.objects<Episode>("Episode").filtered("seconds_listened_to > 30"),
  )

  const unfinishedEpisodes = startedEpisodes.filter(startedEpisode => {
    const secondsRemaining =
      startedEpisode.duration - startedEpisode.seconds_listened_to
    return secondsRemaining >= 2
  })

  const subscribedPodcastIds = Array.from(
    realm.objects<SubscribedPodcast>("SubscribedPodcast"),
  ).map(subscribedPodcast => subscribedPodcast.podcast_id)

  const podcastsWithUnfinishedEpisodes = unfinishedEpisodes
    .map(unfinishedEpisode => unfinishedEpisode.podcast[0])
    .reduce(removingDuplicates, [])
    .reduce(removingSubscribed(subscribedPodcastIds), [])

  setPodcastsWithUnfinishedEpisodes(podcastsWithUnfinishedEpisodes)
}

export default getPodcastsWithUnfinishedEpisodes
