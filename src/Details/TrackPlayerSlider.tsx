import React from "react"
import { Text, View } from "react-native"
import { ProgressComponent } from "react-native-track-player"
import TrackPlayer from "react-native-track-player"
import Slider from "@react-native-community/slider"
import humanReadableDuration from "./humanReadableDuration"

class TrackPlayerSlider extends ProgressComponent {
  public render() {
    return (
      <>
        <Slider
          style={{ width: "100%", height: 40 }}
          value={this.state.position}
          minimumValue={0}
          maximumValue={this.state.duration}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000ff"
          onSlidingComplete={newValue => TrackPlayer.seekTo(newValue)}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{humanReadableDuration(Math.round(this.state.position))}</Text>
          <Text>
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
