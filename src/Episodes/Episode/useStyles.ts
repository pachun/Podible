import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

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
        fontSize: 14,
        fontWeight: "bold",
        color: colorScheme.episodeDateAndDurationLabel,
      },
      description: {
        color: colorScheme.descriptionLabel,
        fontSize: 16,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
