type PodibleAction =
  | {
      type: "SET_TRACK_PLAYER_STATE"
      value: TrackPlayerState
    }
  | {
      type: "SET_PLAYBACK_STATE"
      value: PlaybackState
    }
  | {
      type: "SET_PLAYBACK_RATE"
      value: number
    }
  | {
      type: "SET_SEEK_AFTER_NEXT_PLAY_EVENT"
      value: SeekAfterNextPlayEvent
    }
