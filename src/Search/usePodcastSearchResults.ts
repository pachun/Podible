import { useCallback, useState, useEffect } from "react"

interface UsePodcastSearchResultsProps {
  searchedText: string
}

const usePodcastSearchResults = ({
  searchedText,
}: UsePodcastSearchResultsProps): {
  podcastSearchResults: PodcastSearchResult[]
} => {
  const [podcastSearchResults, setPodcastSearchResults] = useState<
    PodcastSearchResult[]
  >([])

  const getPodcastSearchResults = useCallback(async () => {
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
  }, [searchedText])

  useEffect(() => {
    getPodcastSearchResults()
  }, [getPodcastSearchResults])

  return { podcastSearchResults }
}

export default usePodcastSearchResults
