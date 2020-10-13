const podcastSearchResult: PodcastSearchResult = {
  title: "",
  publisher: "",
  artworkUrl: "",
  rssFeedUrl: "",
}

const PodcastSearchResultFactory = (
  partialPodcastSearchResult: Partial<PodcastSearchResult>,
): PodcastSearchResult => ({
  ...podcastSearchResult,
  ...partialPodcastSearchResult,
})

export default PodcastSearchResultFactory
