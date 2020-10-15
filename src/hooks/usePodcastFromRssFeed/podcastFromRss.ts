import title from "./title"
import description from "./description"
import duration from "./duration"
import audioUrl from "./audioUrl"

const episodeFromRssItem = (rss: any): Episode => ({
  title: title(rss),
  publishedOn: new Date(rss["pubDate"][0]),
  description: description(rss),
  duration: duration(rss),
  audioUrl: audioUrl(rss),
})

const removingEpisodesWithoutAudio = (episode: Episode) =>
  Boolean(episode.audioUrl)

const podcastFromRss = (rss: any): Podcast => ({
  title: rss["rss"]["channel"][0]["title"][0],
  publisher: rss["rss"]["channel"][0]["itunes:author"][0],
  description: rss["rss"]["channel"][0]["description"][0],
  artworkUrl: rss["rss"]["channel"][0]["image"][0]["url"][0],
  episodes: rss["rss"]["channel"][0]["item"]
    .map(episodeFromRssItem)
    .filter(removingEpisodesWithoutAudio),
})

export default podcastFromRss
