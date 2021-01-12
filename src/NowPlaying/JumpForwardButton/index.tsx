import React from "react"
import { TouchableOpacity, View, Text } from "react-native"
import * as Haptics from "expo-haptics"
import { AntDesign } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import jumpInterval from "../../setup-react-native-track-player/jump-interval"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

const JumpForwardButton = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]
  return (
    <TouchableOpacity
      onPress={async () => {
        Haptics.impactAsync()
        const position = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(position + jumpInterval)
      }}
    >
      <View>
        <AntDesign name="reload1" size={40} color={colorScheme.foreground} />
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colorScheme.foreground,
            }}
          >
            {jumpInterval}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default JumpForwardButton
