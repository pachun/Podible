import React, { ReactElement } from "react"
import { StatusBar } from "expo-status-bar"
import useColorScheme from "../hooks/useColorScheme"

const PodibleStatusBar = (): ReactElement => {
  const colorSchemeName = useColorScheme()
  const statusBarStyle = colorSchemeName === "dark" ? "light" : "dark"

  return <StatusBar style={statusBarStyle} />
}

export default PodibleStatusBar
