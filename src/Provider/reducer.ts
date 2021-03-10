const reducer = (state: PodibleState, action: PodibleAction): PodibleState => {
  switch (action.type) {
    case "SET_TRACK_PLAYER_STATE":
      return { ...state, trackPlayerState: action.value }
    case "SET_PLAYBACK_STATE":
      return { ...state, playbackState: action.value }
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.value }
    case "SET_SEEK_AFTER_NEXT_PLAY_EVENT":
      return { ...state, seekAfterNextPlayEvent: action.value }
  }
}

export default reducer
