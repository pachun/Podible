import React, { ReactElement, useContext } from "react"
import { Text, View } from "react-native"
import { PodibleContext } from "../../Provider"
import TrackPlayer from "react-native-track-player"
import Slider from "@react-native-community/slider"
import humanReadableDuration from "../../shared/humanReadableDuration"
import useColorScheme from "../../hooks/useColorScheme"
import { playEpisode } from "../../shared/trackPlayerHelpers"
import usePositionAndDuration from "../../hooks/usePositionAndDuration"

interface ScrubBarProps {
  scrubValue: number | undefined
  setScrubValue: (scrubValue: number | undefined) => void
}

const ScrubBar = ({
  scrubValue,
  setScrubValue,
}: ScrubBarProps): ReactElement => {
  const colorScheme = useColorScheme()

  const {
    currentlyPlayingEpisode,
    playbackState,
    setSeekAfterNextPlayEvent,
  } = useContext(PodibleContext)

  const { position, duration } = usePositionAndDuration(
    currentlyPlayingEpisode,
    scrubValue,
  )

  const elapsedTimeLabel = React.useMemo(() => {
    return humanReadableDuration(Math.floor(position))
  }, [position])

  const remainingTimeLabel = React.useMemo(() => {
    return `-${humanReadableDuration(Math.floor(duration - position))}`
  }, [duration, position])

  return (
    <>
      <Slider
        style={{ width: "100%", height: 40 }}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor={colorScheme.button}
        thumbTintColor={colorScheme.button}
        maximumTrackTintColor={colorScheme.sliderRemainingColor}
        onValueChange={newValue => setScrubValue(newValue)}
        onSlidingComplete={newValue => {
          if (playbackState === "playing") {
            TrackPlayer.seekTo(newValue)
            setTimeout(() => setScrubValue(undefined), 1000)
          } else {
            playEpisode(
              currentlyPlayingEpisode,
              setSeekAfterNextPlayEvent,
              newValue,
            )
            setTimeout(() => setScrubValue(undefined), 2000)
          }
        }}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colorScheme.timeLabel }}>{elapsedTimeLabel}</Text>
        <Text style={{ color: colorScheme.timeLabel }}>
          {remainingTimeLabel}
        </Text>
      </View>
    </>
  )
}

export default React.memo(ScrubBar)
