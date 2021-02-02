import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: colorScheme.differentBackground,
        borderRadius: 10,
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 40,
        color: colorScheme.loud,
        letterSpacing: 1,
      },
      playbackRateLabels: {
        paddingLeft: 12,
        paddingRight: 8,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      },
      xPlaybackRateLabel: {
        fontSize: 18,
        color: colorScheme.foreground,
      },
      playbackRateLabel: {
        fontSize: 18,
        color: colorScheme.loud,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
