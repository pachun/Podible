import React, { ReactElement, useContext, useMemo } from "react"
import { Text, View } from "react-native"
import { PodibleContext } from "../Provider"
import TrackPlayer from "react-native-track-player"
import Slider from "@react-native-community/slider"
import humanReadableDuration from "./humanReadableDuration"
import useColorScheme from "../hooks/useColorScheme"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"

const ScrubBar = (): ReactElement => {
  const colorScheme = useColorScheme()
  const { position, duration } = useTrackPlayerProgress()

  const { currentlyPlayingEpisode } = useContext(PodibleContext)

  const durationEvenWhileBuffering = useMemo(() => {
    if (duration === 0) {
      return currentlyPlayingEpisode.duration
    } else {
      return duration
    }
  }, [duration, currentlyPlayingEpisode.duration])

  const positionEvenWhileBuffering = useMemo(() => {
    if (duration === 0) {
      return currentlyPlayingEpisode.seconds_listened_to
    } else {
      return position
    }
  }, [duration, position, currentlyPlayingEpisode.seconds_listened_to])

  return (
    <>
      <Slider
        style={{ width: "100%", height: 40 }}
        value={positionEvenWhileBuffering}
        minimumValue={0}
        maximumValue={durationEvenWhileBuffering}
        minimumTrackTintColor={colorScheme.button}
        thumbTintColor={colorScheme.button}
        maximumTrackTintColor={colorScheme.sliderRemainingColor}
        onSlidingComplete={newValue => TrackPlayer.seekTo(newValue)}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: colorScheme.timeLabel }}>
          {humanReadableDuration(Math.round(positionEvenWhileBuffering))}
        </Text>
        <Text style={{ color: colorScheme.timeLabel }}>
          -
          {humanReadableDuration(
            Math.round(durationEvenWhileBuffering - positionEvenWhileBuffering),
          )}
        </Text>
      </View>
    </>
  )
}

export default ScrubBar
