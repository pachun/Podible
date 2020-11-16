import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

const useStyles = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        maxWidth: "100%",
        height: 80,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorScheme.background,
      },
      artwork: {
        width: 60,
        height: 60,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles