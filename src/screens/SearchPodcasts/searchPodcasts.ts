const searchPodcasts = async (
  searchedText: string,
): Promise<PodcastSearchResult[]> => {
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

  return podcastSearchResultsFromApple.map(podcastSearchResultFromApple => ({
    title: podcastSearchResultFromApple.collectionName,
    publisher: podcastSearchResultFromApple.artistName,
    imageUrl: podcastSearchResultFromApple.artworkUrl600,
  }))
}

export default searchPodcasts
