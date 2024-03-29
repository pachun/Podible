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
        backgroundColor: colorScheme.differentBackground,
        borderRadius: 10,
        padding: 20,
      },
      title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "600",
        color: colorScheme.loud,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
