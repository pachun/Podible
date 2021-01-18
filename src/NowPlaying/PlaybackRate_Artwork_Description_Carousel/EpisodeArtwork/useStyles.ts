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
        backgroundColor: colorScheme.searchFieldBackground,
        borderRadius: 30,
      },
      title: {
        fontSize: 24,
        fontWeight: "600",
        color: colorScheme.tableHeader,
        letterSpacing: 1,
      },
      artwork: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 30,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
