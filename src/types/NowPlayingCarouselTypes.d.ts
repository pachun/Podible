type NowPlayingCarouselTypes =
  | PlaybackRateType
  | EpisodeArtworkType
  | EpisodeDescriptionType

interface PlaybackRateType {
  type: "playback rate"
}

interface EpisodeArtworkType {
  type: "episode artwork"
  episode: Episode
}

interface EpisodeDescriptionType {
  type: "episode description"
  episode: Episode
}
