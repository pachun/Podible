import { useEffect, useState } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
import TrackPlayer from "react-native-track-player"
import SetupReactNativeTrackPlayer from "../setup-react-native-track-player"

const useAudioPlayer = () => {
  const [isReadyToPlayAudio, setIsReadyToPlayAudio] = useState<boolean>(false)

  const getReadyToPlayAudio = async () => {
    await SetupReactNativeTrackPlayer()
    setIsReadyToPlayAudio(true)
  }

  const audioInterruptionBegan = () => TrackPlayer.pause()

  const audioInterruptionEnded = () => TrackPlayer.play()

  const pauseForTurnByTurnNavigations = () => {
    const audioInterruptions = new NativeEventEmitter(
      NativeModules.AudioInterruptions,
    )
    audioInterruptions.addListener(
      "audioInterruptionBegan",
      audioInterruptionBegan,
    )
    audioInterruptions.addListener(
      "audioInterruptionEnded",
      audioInterruptionEnded,
    )

    return () => {
      audioInterruptions.removeListener(
        "audioInterruptionBegan",
        audioInterruptionBegan,
      )
      audioInterruptions.removeListener(
        "audioInterruptionEnded",
        audioInterruptionEnded,
      )
    }
  }

  useEffect(() => {
    getReadyToPlayAudio()
  }, [])
  useEffect(() => pauseForTurnByTurnNavigations(), [])

  return isReadyToPlayAudio
}

export default useAudioPlayer
