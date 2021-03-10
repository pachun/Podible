interface PodibleContextType {
  trackPlayerState: TrackPlayerState
  playbackState: PlaybackState
  playbackRate: number
  seekAfterNextPlayEvent: SeekAfterNextPlayEvent

  setTrackPlayerState: (value: TrackPlayerState) => void
  setPlaybackState: (value: PlaybackState) => void
  setPlaybackRate: (value: number) => void
  setSeekAfterNextPlayEvent: (value: SeekAfterNextPlayEvent) => void
}
