import { useEffect, useState } from "react"
import { parseString } from "react-native-xml2js"
import podcastFromRss from "./podcastFromRss"

interface UsePodcastFromRssFeedProps {
  rssFeedUrl: string
}

const usePodcastFromRssFeed = ({ rssFeedUrl }: UsePodcastFromRssFeedProps) => {
  const [podcast, setPodcast] = useState<Podcast>()

  const getPodcastFromRssFeed = async () => {
    const response = await fetch(rssFeedUrl)
    const responseData = await response.text()
    parseString(responseData, (_: any, rss: any) =>
      setPodcast(podcastFromRss(rss)),
    )
  }

  useEffect(() => {
    getPodcastFromRssFeed()
  }, [rssFeedUrl])

  return { podcast }
}

export default usePodcastFromRssFeed
