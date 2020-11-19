const description = (podcastEpisodeFromRssFeed: any) => {
  if (podcastEpisodeFromRssFeed["description"]) {
    return podcastEpisodeFromRssFeed["description"][0]
  } else if (podcastEpisodeFromRssFeed["itunes:summary"]) {
    return podcastEpisodeFromRssFeed["itunes:summary"][0]
  }
  return ""
}

export default description
