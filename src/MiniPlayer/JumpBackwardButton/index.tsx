import React from "react"
import { TouchableOpacity, View, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import jumpInterval from "../../setup-react-native-track-player/jump-interval"

const JumpBackwardButton = () => (
  <TouchableOpacity
    testID="Skip Backward"
    onPress={async () => {
      const position = await TrackPlayer.getPosition()
      await TrackPlayer.seekTo(position - jumpInterval)
    }}
  >
    <View>
      <AntDesign
        name="reload1"
        size={40}
        color="black"
        style={{ transform: [{ scaleX: -1 }] }}
      />
      <View
        style={{
          position: "absolute",
          top: 6,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{jumpInterval}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default JumpBackwardButton
