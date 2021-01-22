interface Podcast {
  id: number
  title: string
  publisher: string
  description: string
  artwork_url: string
  rss_feed_url: string
  episode_pages_fetched: number
  every_episode_has_been_loaded: boolean
  episodes: Episode[]
}
