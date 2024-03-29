import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

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
        ...colorScheme.dropShadow,
      },
      openNowPlayingModalButton: {
        width: 60,
        justifyContent: "center",
        alignItems: "center",
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
