import { useMemo } from "react"
import { StyleSheet } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"

const useStyles = (): any => {
  const colorScheme = useColorScheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: colorScheme.differentBackground,
      },
    })
  }, [colorScheme])

  return styles
}

export default useStyles
