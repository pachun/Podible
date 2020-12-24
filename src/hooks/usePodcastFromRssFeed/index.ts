import { useEffect, useState } from "react"
import Realm from "realm"
import realmConfiguration from "./realmConfiguration"

interface UsePodcastFromRssFeedProps {
  rssFeedUrl: string
  usingCache?: boolean
}

const usePodcastFromRssFeed = ({
  rssFeedUrl,
  usingCache = true,
}: UsePodcastFromRssFeedProps) => {
  const [podcast, setPodcast] = useState<Podcast>()

  const setCachedPodcast = async (podcast: Podcast) => {
    if (!usingCache) return
    const realm = await Realm.open(realmConfiguration)
    const existingCachedPodcast = realm
      .objects<Podcast>("Podcast")
      .filtered(`rss_feed_url='${rssFeedUrl}'`)?.[0]
    const podcastHasBeenCached = Boolean(existingCachedPodcast)
    const podcastHasBeenUpdated =
      podcastHasBeenCached &&
      existingCachedPodcast.episodes[0].published_on !==
        podcast.episodes[0].published_on
    if (!podcastHasBeenCached) {
      realm.write(() => realm.create("Podcast", podcast))
    } else if (podcastHasBeenUpdated) {
      realm.write(() => realm.delete(existingCachedPodcast))
      realm.write(() => realm.create("Podcast", podcast))
    }
  }

  const abortController = new AbortController()
  const getPodcastFromRssFeed = async () => {
    try {
      const response = await fetch(
        __DEV__
          ? `http://172.20.10.2:4000/podcasts?rss_feed_url=${rssFeedUrl}`
          : `https://impeccable-nautical-aardvark.gigalixirapp.com/podcasts?rss_feed_url=${rssFeedUrl}`,
        { signal: abortController.signal },
      )
      const responseJson = await response.json()
      const podcast = responseJson as Podcast
      setPodcast(podcast)
      setCachedPodcast(podcast)
    } catch {}
  }

  const getCachedPodcast = async () => {
    if (!usingCache) return
    const realm = await Realm.open(realmConfiguration)
    const realmPodcast = realm
      .objects<Podcast>("Podcast")
      .filtered(`rss_feed_url='${rssFeedUrl}'`)?.[0]
    if (realmPodcast) {
      setPodcast(realmPodcast)
    }
  }

  useEffect(() => {
    getCachedPodcast()
  }, [rssFeedUrl])

  useEffect(() => {
    getPodcastFromRssFeed()
  }, [rssFeedUrl])

  return { podcast, abortController }
}

export default usePodcastFromRssFeed
