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
  primaryKey: "audio_url",
  properties: {
    audio_url: "string",
    title: "string",
    description: "string",
    published_at: "string",
    duration: "int",
    artwork_url: "string",
    publisher: "string",
    seconds_listened_to: { type: "int", default: 0 },
  },
}

const realmConfiguration = {
  schema: [PodcastSchema, EpisodeSchema],
  deleteRealmIfMigrationNeeded: true,
}

export default realmConfiguration
