import TrackPlayer from "react-native-track-player"

const ReactNativeTrackPlayerPlaybackService = () => async () => {
  await TrackPlayer.addEventListener("remote-play", TrackPlayer.play)
  await TrackPlayer.addEventListener("remote-pause", TrackPlayer.pause)
}

export default ReactNativeTrackPlayerPlaybackService
