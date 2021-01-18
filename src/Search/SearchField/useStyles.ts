import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"

const useStyles = (): any => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  const styles = useMemo(() => {
    return StyleSheet.create({
      searchFieldContainer: {
        width: "90%",
        justifyContent: "space-between",
        flexDirection: "row",
      },
      cancelButtonContainer: {
        justifyContent: "center",
      },
      cancelButtonLabel: {
        fontSize: 18,
        color: colorScheme.button,
        opacity: 0,
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
        width: "100%",
        marginBottom: 5,
        paddingLeft: 10,
      },
      searchField: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        color: colorScheme.foreground,
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
