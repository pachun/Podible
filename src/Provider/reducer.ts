const reducer = (state: PodibleState, action: PodibleAction): PodibleState => {
  switch (action.type) {
    case "SET_CURRENTLY_PLAYING_EPISODE":
      return { ...state, currentlyPlayingEpisode: action.value }
    default:
      return state
  }
}

export default reducer
