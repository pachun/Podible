import React from "react"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"

const usePositionAndDuration = (
  currentlyPlayingEpisode: Episode | undefined,
  scrubValue: number | undefined,
): { position: number; duration: number } => {
  const { position, duration } = useTrackPlayerProgress()

  const durationEvenWhileBuffering = React.useMemo(() => {
    if (duration === 0) {
      return currentlyPlayingEpisode.duration
    } else {
      return duration
    }
  }, [duration, currentlyPlayingEpisode.duration])

  const positionEvenWhileBuffering = React.useMemo(() => {
    if (duration === 0) {
      return currentlyPlayingEpisode.seconds_listened_to
    } else {
      return position
    }
  }, [duration, position, currentlyPlayingEpisode.seconds_listened_to])

  const positionEvenWhileBufferingAndConsideringScrubPosition = React.useMemo(
    () => (scrubValue ? scrubValue : positionEvenWhileBuffering),
    [scrubValue, positionEvenWhileBuffering],
  )

  return {
    position: positionEvenWhileBufferingAndConsideringScrubPosition,
    duration: durationEvenWhileBuffering,
  }
}

export default usePositionAndDuration
