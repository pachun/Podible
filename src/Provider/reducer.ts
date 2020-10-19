const reducer = (state: PodibleState, action: PodibleAction) => {
  switch (action.type) {
    case "SET_TRACK":
      return { ...state, track: action.value }
    default:
      return state
  }
}

export default reducer
