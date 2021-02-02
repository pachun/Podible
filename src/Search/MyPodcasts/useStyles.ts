import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      list: {
        backgroundColor: colorScheme.differentBackground,
        flex: 1,
      },
      headerContainer: {
        alignItems: "center",
        backgroundColor: colorScheme.tableHeaderBackground,
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerBackground: {
        width: "90%",
      },
      headerTitle: {
        color: colorScheme.tableHeaderText,
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 1,
        width: "100%",
        textAlign: "center",
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
