const reducer = (state: PodibleState, action: PodibleAction): PodibleState => {
  switch (action.type) {
    case "SET_CURRENTLY_PLAYING_EPISODE":
      return { ...state, currentlyPlayingEpisode: action.value }
    case "SET_PLAYBACK_STATE":
      return { ...state, playbackState: action.value }
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.value }
    default:
      return state
  }
}

export default reducer
