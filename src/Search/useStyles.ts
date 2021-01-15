import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

const useStyles = (): any => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colorScheme.background,
      },
      list: {
        flex: 1,
      },
      searchFieldContainer: {
        width: "100%",
        alignItems: "center",
      },
      searchIconContainer: {
        height: "100%",
        justifyContent: "center",
      },
      searchFieldBackground: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colorScheme.searchFieldBackground,
        borderRadius: 10,
        height: 40,
        width: "90%",
        marginBottom: 5,
        paddingLeft: 10,
      },
      searchField: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
      },
      clearSearchFieldTextButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
