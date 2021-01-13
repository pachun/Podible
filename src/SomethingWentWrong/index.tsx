import React, { useState, useEffect } from "react"
import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import useStyles from "./useStyles"

const random = <T,>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)]

const unhappyEmojis = ["🥺", "🤕", "😳", "😰"]

const SomethingWentWrong = () => {
  const styles = useStyles()
  const navigation = useNavigation()

  const [unhappyEmoji, setUnhappyEmoji] = useState("")

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUnhappyEmoji(random(unhappyEmojis))
    })

    return unsubscribe
  }, [navigation])

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

export default SomethingWentWrong
