import Realm from "realm"
import realmConfiguration from "../realmConfiguration"

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

  const podcastsWithUnfinishedEpisodes = unfinishedEpisodes
    .map(unfinishedEpisode => unfinishedEpisode.podcast[0])
    .reduce(removingDuplicates, [])

  setPodcastsWithUnfinishedEpisodes(podcastsWithUnfinishedEpisodes)
}

export default getPodcastsWithUnfinishedEpisodes
