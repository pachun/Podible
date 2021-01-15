import TrackPlayer from "react-native-track-player"
import jumpInterval from "./jump-interval"
import ReactNativeTrackPlayerPlaybackService from "./react-native-track-player-playback-service"

const ReactNativeTrackPlayerService = async (): Promise<void> => {
  await TrackPlayer.setupPlayer({
    iosCategoryMode: "spokenAudio",
  })
  await TrackPlayer.registerPlaybackService(
    ReactNativeTrackPlayerPlaybackService,
  )
  TrackPlayer.updateOptions({
    //@ts-ignore
    alwaysPauseOnInterruption: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
    jumpInterval,
  })
}

export default ReactNativeTrackPlayerService
