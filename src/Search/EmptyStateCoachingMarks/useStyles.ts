import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colorScheme.differentBackground,
        alignItems: "center",
      },
      directions: {
        fontSize: 24,
        color: colorScheme.loud,
        fontWeight: "600",
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
