import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

const useStyles = (): any => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      list: {
        flex: 1,
      },
      headerContainer: {
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: colorScheme.background,
        paddingBottom: 20,
      },
      headerBackground: {
        width: "90%",
      },
      headerTitle: {
        color: colorScheme.tableHeader,
        fontSize: 18,
        width: "100%",
        textAlign: "center",
        fontWeight: "800",
        letterSpacing: 2,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
