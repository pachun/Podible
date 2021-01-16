import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

const useStyles = (): any => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      podcastArtwork: {
        width: 100,
        height: 100,
        borderRadius: 10,
      },
      podcastDetailsContainer: {
        alignItems: "center",
      },
      podcastDetailsBackground: {
        width: "90%",
        flexDirection: "row",
      },
      titleLabel: {
        color: colorScheme.foreground,
        fontSize: 20,
        fontWeight: "bold",
      },
      publisherLabel: {
        color: colorScheme.publisherLabel,
        fontSize: 12,
      },
      podcastDetails: {
        marginLeft: 10,
        flex: 1,
      },
      podcastDescriptionContainer: {
        alignItems: "center",
      },
      podcastDescriptionBackground: {
        width: "90%",
      },
      podcastDescriptionLabel: {
        color: colorScheme.foreground,
        fontSize: 16,
      },
      subscribeButtonContainer: {
        width: "100%",
        alignItems: "center",
      },
      subscribeButtonBackground: {
        width: 200,
        height: 50,
        backgroundColor: colorScheme.button,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      },
      subscribeButtonLabel: {
        color: colorScheme.background,
        fontWeight: "700",
        fontSize: 18,
        letterSpacing: 2,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
