import { useEffect, useState } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
import TrackPlayer from "react-native-track-player"
import usePrevious from "./usePrevious"

interface UseAudioInterruptionsProps {
  playbackState: string
}

const useAudioInterruptions = ({
  playbackState,
}: UseAudioInterruptionsProps) => {
  const [audioInterruptionDidBegin, setAudioInterruptionDidBegin] = useState<
    boolean
  >(false)

  const previousPlaybackState = usePrevious(playbackState)

  const audioInterruptionBegan = () => {
    if (previousPlaybackState === "playing") {
      setAudioInterruptionDidBegin(true)
    }
  }

  const audioInterruptionEnded = () => {
    if (audioInterruptionDidBegin) {
      setAudioInterruptionDidBegin(false)
      TrackPlayer.play()
    }
  }

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
        "audioInterruptionEnded",
        audioInterruptionEnded,
      )
      audioInterruptions.removeListener(
        "audioInterruptionBegan",
        audioInterruptionBegan,
      )
    }
  }

  useEffect(() => pauseForTurnByTurnNavigations(), [
    audioInterruptionDidBegin,
    playbackState,
  ])
}

export default useAudioInterruptions
