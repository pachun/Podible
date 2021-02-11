interface SetCurrentlyPlayingEpisodeAction {
  type: "SET_CURRENTLY_PLAYING_EPISODE"
  value: Episode
}

interface SetPlaybackStateAction {
  type: "SET_PLAYBACK_STATE"
  value: string
}

interface SetPlaybackRateAction {
  type: "SET_PLAYBACK_RATE"
  value: number
}

type PodibleAction =
  | SetCurrentlyPlayingEpisodeAction
  | SetPlaybackStateAction
  | SetPlaybackRateAction
