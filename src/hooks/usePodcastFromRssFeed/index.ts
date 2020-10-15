import { useEffect, useState } from "react"
import { parseString } from "react-native-xml2js"
import podcastFromRss from "./podcastFromRss"
import { fakedPodcastFromRssFeed } from "../../../e2e/fakedResponses"
import env from "react-native-config"

interface UsePodcastFromRssFeedProps {
  rssFeedUrl: string
}

const usePodcastFromRssFeed = ({ rssFeedUrl }: UsePodcastFromRssFeedProps) => {
  const [podcast, setPodcast] = useState<Podcast>()

  const getPodcastFromRssFeed = async () => {
    /* istanbul ignore if */
    if (env.RUNNING_DETOX_TESTS === "yes") {
      setPodcast(fakedPodcastFromRssFeed(rssFeedUrl))
      return
    }

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
