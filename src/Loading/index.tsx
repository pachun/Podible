import React from "react"
import { ActivityIndicator, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

const Loading = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorScheme.background,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading
