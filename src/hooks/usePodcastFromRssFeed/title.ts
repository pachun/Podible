const title = (podcastEpisodeFromRssFeed: any) => {
  if (podcastEpisodeFromRssFeed["itunes:title"]) {
    return podcastEpisodeFromRssFeed["itunes:title"][0]
  }
  return podcastEpisodeFromRssFeed["title"][0]
}

export default title
