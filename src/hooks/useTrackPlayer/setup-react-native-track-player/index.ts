import TrackPlayer from "react-native-track-player"
import { jumpInterval } from "../../../shared/trackPlayerHelpers"
import ReactNativeTrackPlayerPlaybackService from "./react-native-track-player-playback-service"

const permitPlay = TrackPlayer.CAPABILITY_PLAY
const permitPause = TrackPlayer.CAPABILITY_PAUSE
const permitStop = TrackPlayer.CAPABILITY_STOP
const permitLockScreensSeekForwardButton = TrackPlayer.CAPABILITY_JUMP_FORWARD
const permitLockScreensSeekBackwardButton = TrackPlayer.CAPABILITY_JUMP_BACKWARD
const permitCarsSteeringWheelsSeekForwardButton =
  TrackPlayer.CAPABILITY_SKIP_TO_NEXT
const permitCarsSteeringWheelSeekBackwardButton =
  TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS

const unusedTrackPlayerCapabilities = [
  TrackPlayer.CAPABILITY_PLAY_FROM_ID,
  TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH,
  TrackPlayer.CAPABILITY_SEEK_TO,
  TrackPlayer.CAPABILITY_SKIP,
  TrackPlayer.CAPABILITY_SET_RATING,
  TrackPlayer.CAPABILITY_LIKE,
  TrackPlayer.CAPABILITY_DISLIKE,
  TrackPlayer.CAPABILITY_BOOKMARK,
]

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
      permitPlay,
      permitPause,
      permitStop,
      permitLockScreensSeekForwardButton,
      permitLockScreensSeekBackwardButton,
      permitCarsSteeringWheelsSeekForwardButton,
      permitCarsSteeringWheelSeekBackwardButton,

      ...unusedTrackPlayerCapabilities,
    ],
    jumpInterval,
  })
}

export default ReactNativeTrackPlayerService
