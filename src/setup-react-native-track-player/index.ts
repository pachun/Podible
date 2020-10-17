import TrackPlayer from "react-native-track-player"
import ReactNativeTrackPlayerPlaybackService from "./react-native-track-player-playback-service"

const ReactNativeTrackPlayerService = async () => {
  await TrackPlayer.setupPlayer()
  await TrackPlayer.registerPlaybackService(
    ReactNativeTrackPlayerPlaybackService,
  )
  TrackPlayer.updateOptions({
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  })
}

export default ReactNativeTrackPlayerService
