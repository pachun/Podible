const reducer = (state: PodibleState, action: PodibleAction): PodibleState => {
  switch (action.type) {
    case "SET_EPISODE":
      return { ...state, episode: action.value }
    default:
      return state
  }
}

export default reducer
