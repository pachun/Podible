const audioUrl = (podcastEpisodeFromRssFeed: any) => {
  if (podcastEpisodeFromRssFeed["enclosure"]) {
    return podcastEpisodeFromRssFeed["enclosure"][0]["$"]["url"]
  }
  return ""
}

export default audioUrl
