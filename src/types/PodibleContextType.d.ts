interface PodibleContextType {
  episode?: Episode
  setEpisode: (episode: Episode) => void
  playbackState: string
  playbackRate: number
  setPlaybackRate: (playbackRate: number) => void
}
