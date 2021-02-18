import { useMemo } from "react"
import { StyleSheet } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import useColorScheme from "../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()
  const insets = useSafeArea()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colorScheme.background,
      },
      headerContainer: {
        width: "100%",
        height: 50,
        marginTop: insets.top,
        flexDirection: "row",
      },
      headerButtonContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      episodeAndPodcastTitlesContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingLeft: 5,
        paddingRight: 5,
      },
      episodeTitle: {
        color: colorScheme.foreground,
        fontSize: 16,
        fontWeight: "600",
        width: "100%",
        textAlign: "center",
      },
      podcastTitle: {
        color: colorScheme.podcastTitle,
        fontWeight: "500",
        width: "100%",
        textAlign: "center",
      },
      carouselContainer: {
        width: "90%",
        aspectRatio: 1,
        alignItems: "center",
      },
      sliderContainer: {
        width: "80%",
      },
      controlsContainer: {
        flex: 1,
        width: "70%",
        justifyContent: "center",
      },
      controlsBackground: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    })
  }, [colorScheme, insets.top])

  return styles
}

export default useStyles
