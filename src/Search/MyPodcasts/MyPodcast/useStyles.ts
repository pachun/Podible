import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: "center",
      },
      background: {
        width: "90%",
        flexDirection: "row",
      },
      podcastInformation: {
        paddingLeft: 20,
        justifyContent: "center",
      },
      podcastTitle: {
        color: colorScheme.foreground,
        fontSize: 20,
        fontWeight: "700",
        maxWidth: 250,
      },
      podcastPublisher: {
        fontSize: 14,
        fontWeight: "bold",
        color: colorScheme.publisherLabel,
        maxWidth: 250,
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
