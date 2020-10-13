import { useState, useEffect } from "react"
import { fakedPodcastSearchResults } from "../../e2e/fakedResponses"
import env from "react-native-config"

interface UsePodcastSearchResultsProps {
  searchedText: string
}

const usePodcastSearchResults = ({
  searchedText,
}: UsePodcastSearchResultsProps) => {
  const [podcastSearchResults, setPodcastSearchResults] = useState<
    PodcastSearchResult[]
  >([])

  const getPodcastSearchResults = async () => {
    /* istanbul ignore if */
    if (env.RUNNING_DETOX_TESTS === "yes") {
      setPodcastSearchResults(fakedPodcastSearchResults(searchedText))
      return
    }

    // https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api
    const podcastSearchUrl = `https://itunes.apple.com/search`

    const podcastSearchResponse = await fetch(
      `${podcastSearchUrl}?media=podcast&term=${encodeURIComponent(
        searchedText,
      )}`,
    )

    const podcastSearchResultsFromApple: PodcastSearchResultFromApple[] = (
      await podcastSearchResponse.json()
    ).results

    const podcastSearchResults = podcastSearchResultsFromApple.map(
      podcastSearchResultFromApple => ({
        title: podcastSearchResultFromApple.collectionName,
        publisher: podcastSearchResultFromApple.artistName,
        artworkUrl: podcastSearchResultFromApple.artworkUrl600,
        rssFeedUrl: podcastSearchResultFromApple.feedUrl,
      }),
    )

    setPodcastSearchResults(podcastSearchResults)
  }

  useEffect(() => {
    getPodcastSearchResults()
  }, [searchedText])

  return { podcastSearchResults }
}

export default usePodcastSearchResults
