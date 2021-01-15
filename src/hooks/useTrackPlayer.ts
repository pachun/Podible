import { useEffect, useState } from "react"
import SetupReactNativeTrackPlayer from "../setup-react-native-track-player"

const useTrackPlayer = (): boolean => {
  const [isReadyToPlayAudio, setIsReadyToPlayAudio] = useState<boolean>(false)

  const getReadyToPlayAudio = async () => {
    await SetupReactNativeTrackPlayer()
    setIsReadyToPlayAudio(true)
  }
  useEffect(() => {
    getReadyToPlayAudio()
  }, [])

  return isReadyToPlayAudio
}

export default useTrackPlayer
