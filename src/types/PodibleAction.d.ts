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

interface SetSeekAfterNextPlayEventAction {
  type: "SET_SEEK_AFTER_NEXT_PLAY_EVENT"
  value: SeekAfterNextPlayEvent
}

type PodibleAction =
  | SetCurrentlyPlayingEpisodeAction
  | SetPlaybackStateAction
  | SetPlaybackRateAction
  | SetSeekAfterNextPlayEventAction
