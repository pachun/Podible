interface PodibleState {
  currentlyPlayingEpisode?: Episode
  playbackState: PlaybackState
  playbackRate: number
  seekAfterNextPlayEvent: SeekAfterNextPlayEvent
}
