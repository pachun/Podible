import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: colorScheme.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      unhappyEmoji: {
        fontSize: 100,
      },
      sorry: {
        color: colorScheme.foreground,
        fontSize: 28,
      },
      somethingWentWrong: {
        color: colorScheme.foreground,
        fontSize: 18,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
