import React, { ReactElement } from "react"
import { ActivityIndicator, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

const Loading = (): ReactElement => {
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
      <ActivityIndicator size="large" color={colorScheme.tableHeader} />
    </View>
  )
}

export default Loading
