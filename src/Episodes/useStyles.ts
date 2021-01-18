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
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
