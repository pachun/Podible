interface PodibleState {
  currentlyPlayingEpisode?: Episode
  playbackState: string
  playbackRate: number
  seekAfterNextPlayEvent: SeekAfterNextPlayEvent
}
