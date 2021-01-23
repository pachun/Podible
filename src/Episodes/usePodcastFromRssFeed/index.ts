import { useRef, useCallback, useEffect, useState } from "react"
import Realm from "realm"
import apiUrl from "../../shared/apiUrl"
import realmConfiguration from "../../shared/realmConfiguration"

const logError = (rssFeedUrl: string, exception: string) =>
  fetch(`${apiUrl}/client_rss_feed_errors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rss_feed_url: rssFeedUrl,
      exception: exception,
    }),
  })

const setCachedPodcast = async (
  podcastFromRssFeed: Podcast,
): Promise<Podcast> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    realm.create<Podcast>(
      "Podcast",
      podcastFromRssFeed,
      Realm.UpdateMode.Modified,
    )
  })
  const cachedPodcast = realm.objectForPrimaryKey<Podcast>(
    "Podcast",
    podcastFromRssFeed.rss_feed_url,
  )
  return cachedPodcast
}

interface UsePodcastFromRssFeedProps {
  rssFeedUrl: string
}

const usePodcastFromRssFeed = ({
  rssFeedUrl,
}: UsePodcastFromRssFeedProps): {
  podcast: Podcast
  didError: boolean
  abortController: AbortController
} => {
  const [podcast, setPodcast] = useState<Podcast>()
  const [didError, setDidError] = useState(false)

  const abortController = useRef(new AbortController())
  const getPodcastFromRssFeed = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/rss_feed?url=${rssFeedUrl}`, {
        signal: abortController.current.signal,
      })
      if (response.status === 422) {
        setDidError(true)
        return
      }
      const responseJson = await response.json()
      const podcastFromRssFeed = responseJson as Podcast
      const cachedPodcast = await setCachedPodcast(podcastFromRssFeed)
      setPodcast(cachedPodcast)
    } catch (exception) {
      setDidError(true)
      logError(rssFeedUrl, exception)
    }
  }, [rssFeedUrl])

  const getCachedPodcast = useCallback(async () => {
    const realm = await Realm.open(realmConfiguration)
    const realmPodcast = realm
      .objects<Podcast>("Podcast")
      .filtered(`rss_feed_url='${rssFeedUrl}'`)?.[0]
    if (realmPodcast) {
      setPodcast(realmPodcast)
    }
  }, [rssFeedUrl])

  useEffect(() => {
    getCachedPodcast()
  }, [getCachedPodcast])

  useEffect(() => {
    getPodcastFromRssFeed()
  }, [getPodcastFromRssFeed])

  return { podcast, didError, abortController: abortController.current }
}

export default usePodcastFromRssFeed
