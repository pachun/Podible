const description = (podcastEpisodeFromRssFeed: any) => {
  if (podcastEpisodeFromRssFeed["itunes:summary"]) {
    return podcastEpisodeFromRssFeed["itunes:summary"][0]
  }
  return ""
}

export default description
