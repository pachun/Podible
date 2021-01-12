import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../../hooks/useColorScheme"
import colorSchemes from "../../../colorSchemes"

const useStyles = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        alignItems: "center",
        marginTop: 20,
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
        fontWeight: "500",
        maxWidth: 250,
      },
      podcastPublisher: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#7f7f7e",
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
