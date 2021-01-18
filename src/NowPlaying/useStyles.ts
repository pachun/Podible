import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colorScheme.background,
      },
      backButton: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 10,
      },
      carouselContainer: {
        width: "90%",
        aspectRatio: 1,
        alignItems: "center",
      },
      titleAndPublisherContainer: {
        width: "100%",
        alignItems: "center",
      },
      title: {
        color: colorScheme.foreground,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        maxWidth: "90%",
      },
      publisher: {
        color: colorScheme.publisherLabel,
        fontSize: 24,
        textAlign: "center",
        maxWidth: "90%",
      },
      sliderContainer: {
        width: "80%",
      },
      playbackControlsContainer: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
