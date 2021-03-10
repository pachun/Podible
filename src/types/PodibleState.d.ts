type TrackPlayerState =
  | "playing"
  | "paused"
  | "idle"
  | "ready"
  | "buffering"
  | "loading"
  | "unstarted"

interface UnstartedPlaybackState {
  name: "unstarted"
}

interface PlayingPlaybackState {
  name: "playing"
  episodesAudioUrl: string
  secondsListenedTo: number
  secondDuration: number
}

interface PausedPlaybackState {
  name: "paused"
  episodesAudioUrl: string
  secondsListenedTo: number
  secondDuration: number
}

type PlaybackState =
  | UnstartedPlaybackState
  | PlayingPlaybackState
  | PausedPlaybackState

interface PodibleState {
  trackPlayerState: TrackPlayerState
  playbackState: PlaybackState
  playbackRate: number
  seekAfterNextPlayEvent: SeekAfterNextPlayEvent
}
