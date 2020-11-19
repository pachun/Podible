const PodcastSchema = {
  name: "Podcast",
  primaryKey: "rssFeedUrl",
  properties: {
    title: "string",
    publisher: "string",
    description: "string",
    artworkUrl: "string",
    episodes: "Episode[]",
    rssFeedUrl: "string",
  },
}

const EpisodeSchema = {
  name: "Episode",
  properties: {
    audioUrl: "string",
    title: "string",
    description: "string",
    publishedOn: "date",
    duration: "int",
    artworkUrl: "string",
    publisher: "string",
  },
}

const realmConfiguration = {
  schema: [PodcastSchema, EpisodeSchema],
  deleteRealmIfMigrationNeeded: true,
}

export default realmConfiguration
