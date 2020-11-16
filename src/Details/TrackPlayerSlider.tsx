import React from "react"
import { Text, View } from "react-native"
import { ProgressComponent } from "react-native-track-player"
import TrackPlayer from "react-native-track-player"
import Slider from "@react-native-community/slider"
import humanReadableDuration from "./humanReadableDuration"

interface TrackPlayerSliderProps {
  colorScheme: any
}

class TrackPlayerSlider extends ProgressComponent<TrackPlayerSliderProps> {
  public render() {
    const { colorScheme } = this.props

    return (
      <>
        <Slider
          style={{ width: "100%", height: 40 }}
          value={this.state.position}
          minimumValue={0}
          maximumValue={this.state.duration}
          minimumTrackTintColor={colorScheme.sliderElapsedColor}
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
          <Text style={{ color: colorScheme.foreground }}>
            {humanReadableDuration(Math.round(this.state.position))}
          </Text>
          <Text style={{ color: colorScheme.foreground }}>
            -
            {humanReadableDuration(
              Math.round(this.state.duration - this.state.position),
            )}
          </Text>
        </View>
      </>
    )
  }
}

export default TrackPlayerSlider
