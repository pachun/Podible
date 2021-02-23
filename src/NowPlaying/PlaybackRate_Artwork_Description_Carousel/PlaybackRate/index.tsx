import React, { ReactElement, useState, useContext } from "react"
import { Text, View } from "react-native"
import * as Haptics from "expo-haptics"
import Slider from "@react-native-community/slider"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../../../Provider"
import usePrevious from "../../../hooks/usePrevious"
import useStyles from "./useStyles"
import useColorScheme from "../../../hooks/useColorScheme"

interface LockValue {
  sliderLabel: string
  sliderValue: number
  playbackRate: number
}

const lockValues: LockValue[] = [
  { sliderLabel: "-", sliderValue: 0.5, playbackRate: 0.8 },
  { sliderLabel: "1x", sliderValue: 0.77, playbackRate: 1.0 },
  { sliderLabel: "+", sliderValue: 1.06, playbackRate: 1.16 },
  { sliderLabel: "+", sliderValue: 1.32, playbackRate: 1.32 },
  { sliderLabel: "+", sliderValue: 1.57, playbackRate: 1.48 },
  { sliderLabel: "+", sliderValue: 1.83, playbackRate: 1.64 },
  { sliderLabel: "+", sliderValue: 2.08, playbackRate: 1.8 },
  { sliderLabel: "2x", sliderValue: 2.38, playbackRate: 2.0 },
  { sliderLabel: "+", sliderValue: 2.67, playbackRate: 2.5 },
  { sliderLabel: "3x", sliderValue: 3.0, playbackRate: 3.0 },
]

const findClosestLockValue = (trueSliderValue: number) => {
  const sliderValueCheckpoints = lockValues.map(
    lockValue => lockValue.sliderValue,
  )

  // https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
  const closestSliderValueCheckpoint = sliderValueCheckpoints.reduce(
    (prev, curr) =>
      Math.abs(curr - trueSliderValue) < Math.abs(prev - trueSliderValue)
        ? curr
        : prev,
  )

  return lockValues.find(
    lockValue => lockValue.sliderValue === closestSliderValueCheckpoint,
  )
}

const PlaybackRate = (): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()

  const { setPlaybackRate, playbackRate } = useContext(PodibleContext)

  const [displayedSliderValue, setDisplayedSliderValue] = useState<number>(
    lockValues.find(lockValue => lockValue.playbackRate === playbackRate)
      .sliderValue,
  )

  const existingPlaybackRateLockValue = lockValues.find(
    lockValue => lockValue.playbackRate === playbackRate,
  )

  const defaultPlaybackRateLockValue = lockValues.find(
    lockValue => lockValue.playbackRate === 1,
  )

  const [closestLockValue, setClosestLockValue] = useState<LockValue>(
    existingPlaybackRateLockValue || defaultPlaybackRateLockValue,
  )

  const lastClosestLockValue = usePrevious(closestLockValue)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playback Rate</Text>
      <View style={styles.playbackRateLabels}>
        <Text style={styles.playbackRateLabel}>-</Text>
        <Text style={styles.xPlaybackRateLabel}>1x</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.xPlaybackRateLabel}>2x</Text>
        <Text style={styles.playbackRateLabel}>+</Text>
        <Text style={styles.xPlaybackRateLabel}>3x</Text>
      </View>
      <Slider
        style={{ width: "100%" }}
        value={displayedSliderValue}
        minimumTrackTintColor={colorScheme.button}
        thumbTintColor={colorScheme.button}
        maximumTrackTintColor={colorScheme.sliderRemainingColor}
        minimumValue={0.5}
        maximumValue={3}
        onValueChange={sliderValue => {
          const currentClosestLockValue = findClosestLockValue(sliderValue)
          if (lastClosestLockValue !== currentClosestLockValue) {
            setClosestLockValue(currentClosestLockValue)

            Haptics.impactAsync()
            setPlaybackRate(closestLockValue.playbackRate)
            TrackPlayer.setRate(closestLockValue.playbackRate)
          }
        }}
        onSlidingComplete={() => {
          setDisplayedSliderValue(closestLockValue.sliderValue)
        }}
      />
    </View>
  )
}

export default React.memo(PlaybackRate)
