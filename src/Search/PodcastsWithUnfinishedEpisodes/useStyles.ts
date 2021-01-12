import { useMemo } from "react"
import { StyleSheet } from "react-native"

const useStyles = () => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      list: {
        flex: 1,
      },
    })
  }, [])

  return styles
}

export default useStyles