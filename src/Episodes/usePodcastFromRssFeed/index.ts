import { useRef, useCallback, useEffect, useState } from "react"
import Realm from "realm"
import realmConfiguration from "../../shared/realmConfiguration"

const apiUrl = __DEV__
  ? `http://${process.env.REACT_NATIVE_API_URL}:3000`
  : `https://podible-web.herokuapp.com`

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
  loadNextPageOfEpisodes: () => void
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

  const [episodePagesFetched, setEpisodePagesFetched] = useState(1)

  const loadNextPageOfEpisodes = async () => {
    const nextPage = episodePagesFetched + 1
    console.log(`fetching page ${nextPage}`)
    const response = await fetch(
      `${apiUrl}/podcasts/${podcast.id}/episodes?page=${nextPage}`,
      {
        signal: abortController.current.signal,
      },
    )
    const nextPageOfEpisodes: Episode[] = (await response.json()) as Episode[]
    const cachedPodcast = await setCachedPodcast({
      ...podcast,
      episodes: [...podcast.episodes, ...nextPageOfEpisodes],
    })
    setPodcast(cachedPodcast)
    console.log(`there are ${cachedPodcast.episodes.length} episodes`)

    if (nextPageOfEpisodes.length > 0) {
      setEpisodePagesFetched(episodePagesFetched + 1)
    }
  }

  useEffect(() => {
    getCachedPodcast()
  }, [getCachedPodcast])

  useEffect(() => {
    getPodcastFromRssFeed()
  }, [getPodcastFromRssFeed])

  return {
    podcast,
    didError,
    abortController: abortController.current,
    loadNextPageOfEpisodes,
  }
}

export default usePodcastFromRssFeed
