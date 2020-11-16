import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

const useStyles = () => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: "100%",
        alignItems: "center",
        borderTopWidth: 0.5,
        borderTopColor: colorScheme.episodeListBorder,
      },
      background: {
        width: "90%",
        paddingTop: 10,
        paddingBottom: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colorScheme.foreground,
      },
      dateAndDuration: {
        fontSize: 12,
        fontWeight: "bold",
        color: colorScheme.episodeDateAndDurationLabel,
      },
      description: {
        color: colorScheme.foreground,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
