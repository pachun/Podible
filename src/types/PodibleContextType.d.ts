interface PodibleContextType {
  currentlyPlayingEpisode?: Episode
  setCurrentlyPlayingEpisode: (currentlyPlayingEpisode: Episode) => void

  playbackState: string
  setPlaybackState: (playbackState: string) => void

  playbackRate: number
  setPlaybackRate: (playbackRate: number) => void

  seekAfterNextPlayEvent: SeekAfterNextPlayEvent
  setSeekAfterNextPlayEvent: (
    seekAfterNextPlayEvent: SeekAfterNextPlayEvent,
  ) => void
}
