import { useMemo } from "react"
import { StyleSheet } from "react-native"

const useStyles = (): any => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
      },
      artwork: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10,
      },
    })
  }, [])

  return styles
}

export default useStyles
