interface PodibleContextType {
  currentlyPlayingEpisode?: Episode
  setCurrentlyPlayingEpisode: (currentlyPlayingEpisode: Episode) => void
  playbackState: string
  playbackRate: number
  setPlaybackRate: (playbackRate: number) => void
}
