import { useState, useMemo, useEffect } from "react"
import humanReadableDuration from "../../shared/humanReadableDuration"

interface UseDurationOrTimeRemainingLabelProps {
  displayedEpisode: Episode
  currentlyPlayingEpisode: Episode | undefined
}

const useDurationOrTimeRemainingLabel = ({
  displayedEpisode,
  currentlyPlayingEpisode,
}: UseDurationOrTimeRemainingLabelProps): string => {
  const [
    durationOrTimeRemainingLabel,
    setDurationOrTimeRemainingLabel,
  ] = useState("")

  const totalEpisodeDurationLabel = useMemo(
    () => humanReadableDuration(displayedEpisode.duration),
    [displayedEpisode.duration],
  )

  const timeRemainingLabel = useMemo(() => {
    const secondsRemaining =
      displayedEpisode.duration - displayedEpisode.seconds_listened_to
    return `${humanReadableDuration(secondsRemaining)} LEFT`
  }, [displayedEpisode.duration, displayedEpisode.seconds_listened_to])

  useEffect(() => {
    const secondsRemaining =
      displayedEpisode.duration - displayedEpisode.seconds_listened_to

    const hasNotListenedOrHasJustBegunListening =
      displayedEpisode.seconds_listened_to < 30
    const hasFinishedListening = secondsRemaining <= 2

    const isCurrentlyListening =
      currentlyPlayingEpisode &&
      displayedEpisode.audio_url === currentlyPlayingEpisode.audio_url

    if (hasNotListenedOrHasJustBegunListening && !isCurrentlyListening) {
      setDurationOrTimeRemainingLabel(totalEpisodeDurationLabel)
    } else if (hasFinishedListening) {
      setDurationOrTimeRemainingLabel("PLAYED")
    } else {
      setDurationOrTimeRemainingLabel(timeRemainingLabel)
    }
  }, [
    displayedEpisode,
    totalEpisodeDurationLabel,
    timeRemainingLabel,
    currentlyPlayingEpisode,
  ])

  return durationOrTimeRemainingLabel
}

export default useDurationOrTimeRemainingLabel
