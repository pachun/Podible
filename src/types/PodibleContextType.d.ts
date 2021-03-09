interface PodibleContextType {
  currentlyPlayingEpisode?: Episode
  setCurrentlyPlayingEpisode: (currentlyPlayingEpisode: Episode) => void

  playbackState: PlaybackState
  setPlaybackState: (playbackState: PlaybackState) => void

  playbackRate: number
  setPlaybackRate: (playbackRate: number) => void

  seekAfterNextPlayEvent: SeekAfterNextPlayEvent
  setSeekAfterNextPlayEvent: (
    seekAfterNextPlayEvent: SeekAfterNextPlayEvent,
  ) => void
}
