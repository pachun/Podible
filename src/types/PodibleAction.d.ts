interface SetCurrentlyPlayingEpisodeAction {
  type: "SET_CURRENTLY_PLAYING_EPISODE"
  value: Episode
}

type PodibleAction = SetCurrentlyPlayingEpisodeAction
