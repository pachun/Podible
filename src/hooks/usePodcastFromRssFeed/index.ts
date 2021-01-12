import { useEffect, useState } from "react"
import Realm from "realm"
import realmConfiguration from "../../realmConfiguration"

const apiUrl = __DEV__
  ? `http://${process.env.REACT_NATIVE_API_URL}:3000`
  : `https://podible-web.herokuapp.com`

const logError = (rssFeedUrl: string, exception: any) =>
  fetch(`${apiUrl}/client_rss_feed_errors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rss_feed_url: rssFeedUrl,
      exception: JSON.stringify(exception),
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

const usePodcastFromRssFeed = ({ rssFeedUrl }: UsePodcastFromRssFeedProps) => {
  const [podcast, setPodcast] = useState<Podcast>()
  const [didError, setDidError] = useState(false)

  const abortController = new AbortController()
  const getPodcastFromRssFeed = async () => {
    try {
      const response = await fetch(`${apiUrl}/rss_feed?url=${rssFeedUrl}`, {
        signal: abortController.signal,
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
  }

  const getCachedPodcast = async () => {
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

  return { podcast, didError, abortController }
}

export default usePodcastFromRssFeed
