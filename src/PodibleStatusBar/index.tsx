import React, { ReactElement } from "react"
import { StatusBar } from "expo-status-bar"
import useColorScheme from "../hooks/useColorScheme"

const PodibleStatusBar = (): ReactElement => {
  const colorScheme = useColorScheme()
  const statusBarStyle = colorScheme.name === "dark" ? "light" : "dark"

  return <StatusBar style={statusBarStyle} />
}

export default React.memo(PodibleStatusBar)
