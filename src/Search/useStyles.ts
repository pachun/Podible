import { useMemo } from "react"
import { StyleSheet } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import useColorScheme from "../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()
  const insets = useSafeArea()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colorScheme.differentBackground,
      },
      list: {
        flex: 1,
      },
      searchFieldContainer: {
        paddingTop: insets.top + 10,
        backgroundColor: colorScheme.background,
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colorScheme.tableBorder,
        paddingBottom: 15,
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
  }, [colorScheme, insets.top])

  return styles
}

export default useStyles
