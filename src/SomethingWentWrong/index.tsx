import React, { ReactElement, useState, useEffect } from "react"
import { Text, View } from "react-native"
import useStyles from "./useStyles"

const random = <T,>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)]

const unhappyEmojis = ["🥺", "🤕", "😳", "😰"]

const SomethingWentWrong = (): ReactElement | null => {
  const styles = useStyles()

  const [unhappyEmoji, setUnhappyEmoji] = useState("")

  useEffect(() => {
    setUnhappyEmoji(random(unhappyEmojis))
  }, [])

  return unhappyEmoji ? (
    <View style={styles.container}>
      <Text style={styles.unhappyEmoji}>{unhappyEmoji}</Text>
      <View style={{ height: 10 }} />
      <Text style={styles.sorry}>{"We're so sorry!"}</Text>
      <View style={{ height: 10 }} />
      <Text style={styles.somethingWentWrong}>
        Something went wrong on our end.
      </Text>
      <View style={{ height: 100 }} />
      <Text style={styles.somethingWentWrong}>{"We're fixing it now."}</Text>
      <View style={{ height: 100 }} />
    </View>
  ) : null
}

export default React.memo(SomethingWentWrong)
