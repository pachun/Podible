interface Podcast {
  id: number
  title: string
  publisher: string
  description: string
  artwork_url: string
  rss_feed_url: string
  episodes: Episode[]
}
