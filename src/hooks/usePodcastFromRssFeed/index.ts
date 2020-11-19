import { useEffect, useState } from "react"
import { parseString } from "react-native-xml2js"
import Realm from "realm"
import realmConfiguration from "./realmConfiguration"
import podcastFromRss from "./podcastFromRss"

interface UsePodcastFromRssFeedProps {
  rssFeedUrl: string
}

const usePodcastFromRssFeed = ({ rssFeedUrl }: UsePodcastFromRssFeedProps) => {
  const [podcast, setPodcast] = useState<Podcast>()

  const setCachedPodcast = async (podcast: Podcast) => {
    const realm = await Realm.open(realmConfiguration)
    const existingCachedPodcast = realm
      .objects<Podcast>("Podcast")
      .filtered(`rssFeedUrl='${rssFeedUrl}'`)?.[0]
    const podcastHasBeenCached = Boolean(existingCachedPodcast)
    const podcastHasBeenUpdated =
      podcastHasBeenCached &&
      existingCachedPodcast.episodes.length !== podcast.episodes.length
    if (!podcastHasBeenCached) {
      realm.write(() => realm.create("Podcast", podcast))
    } else if (podcastHasBeenUpdated) {
      realm.delete(podcast)
      realm.write(() => realm.create("Podcast", podcast))
    }
    realm.close()
  }

  const getPodcastFromRssFeed = async () => {
    const response = await fetch(rssFeedUrl)
    const responseData = await response.text()
    parseString(responseData, (_: any, rss: any) => {
      const podcast = podcastFromRss(rssFeedUrl, rss)
      setPodcast(podcast)
      setCachedPodcast(podcast)
    })
  }

  const getCachedPodcast = async () => {
    const realm = await Realm.open(realmConfiguration)
    const realmPodcast = realm
      .objects<Podcast>("Podcast")
      .filtered(`rssFeedUrl='${rssFeedUrl}'`)?.[0]
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

  return { podcast }
}

export default usePodcastFromRssFeed
