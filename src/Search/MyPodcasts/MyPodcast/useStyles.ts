import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: "center",
        backgroundColor: colorScheme.background,
      },
      background: {
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 0.25,
        borderBottomColor: colorScheme.tableBorder,
      },
      podcastInformation: {
        paddingLeft: 20,
        justifyContent: "center",
      },
      podcastTitle: {
        color: colorScheme.foreground,
        fontSize: 20,
        fontWeight: "500",
        maxWidth: 250,
      },
      podcastPublisher: {
        fontSize: 14,
        fontWeight: "bold",
        color: colorScheme.publisherLabel,
        maxWidth: 250,
      },
      image: {
        width: 100,
        height: 100,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
