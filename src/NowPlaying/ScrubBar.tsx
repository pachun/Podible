import React, { ReactElement } from "react"
import { Text, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import Slider from "@react-native-community/slider"
import humanReadableDuration from "./humanReadableDuration"
import useColorScheme from "../hooks/useColorScheme"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"

const ScrubBar = (): ReactElement => {
  const colorScheme = useColorScheme()
  const { position, duration } = useTrackPlayerProgress()

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
          {humanReadableDuration(Math.round(position))}
        </Text>
        <Text style={{ color: colorScheme.timeLabel }}>
          -{humanReadableDuration(Math.round(duration - position))}
        </Text>
      </View>
    </>
  )
}

export default ScrubBar
