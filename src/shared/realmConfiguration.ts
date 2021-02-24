const PodcastSchema = {
  name: "Podcast",
  primaryKey: "id",
  properties: {
    id: "int",
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
    id: "int",
    audio_url: "string",
    title: "string",
    description: "string",
    published_at: "string",
    duration: "int",
    artwork_url: "string",
    publisher: "string",
    seconds_listened_to: { type: "int", default: 0 },
    download_location: "string?",
    podcast: {
      type: "linkingObjects",
      objectType: "Podcast",
      property: "episodes",
    },
  },
}

const SubscriptionSchema = {
  name: "Subscription",
  primaryKey: "id",
  properties: {
    id: "int",
    podcast_id: "int",
  },
}

const realmConfiguration = {
  schema: [PodcastSchema, EpisodeSchema, SubscriptionSchema],
  deleteRealmIfMigrationNeeded: true,
}

export default realmConfiguration
