const PodcastSchema = {
  name: "Podcast",
  primaryKey: "rss_feed_url",
  properties: {
    title: "string",
    publisher: "string",
    description: "string",
    artwork_url: "string",
    episodes: "Episode[]",
    rss_feed_url: "string",
  },
}

const EpisodeSchema = {
  name: "Episode",
  properties: {
    audio_url: "string",
    title: "string",
    description: "string",
    published_on: "string",
    duration: "int",
    artwork_url: "string",
    publisher: "string",
  },
}

const realmConfiguration = {
  schema: [PodcastSchema, EpisodeSchema],
  deleteRealmIfMigrationNeeded: true,
}

export default realmConfiguration
