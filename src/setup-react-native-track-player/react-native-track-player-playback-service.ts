import TrackPlayer from "react-native-track-player"
import jumpForward from "./jump-forward"
import jumpBackward from "./jump-backward"

const ReactNativeTrackPlayerPlaybackService = () => async (): Promise<void> => {
  await TrackPlayer.addEventListener("remote-play", TrackPlayer.play)
  await TrackPlayer.addEventListener("remote-pause", TrackPlayer.pause)
  await TrackPlayer.addEventListener("remote-stop", TrackPlayer.stop)
  await TrackPlayer.addEventListener("remote-jump-forward", jumpForward)
  await TrackPlayer.addEventListener("remote-jump-backward", jumpBackward)
}

export default ReactNativeTrackPlayerPlaybackService
