import React, { ReactElement } from "react"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import useColorScheme from "../../../hooks/useColorScheme"
import apiUrl from "../../../shared/apiUrl"

interface UnsubscribeRowUnderlay {
  podcast: Podcast
}

const UnsubscribeRowUnderlay = ({
  podcast,
}: UnsubscribeRowUnderlay): ReactElement => {
  const colorScheme = useColorScheme()

  const unsubscribe = (podcast: Podcast) => {
    console.log(`unsubscribing from ${podcast.title}`)

    fetch(`${apiUrl}/subscriptions/`)
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: colorScheme.tableHeader,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 30,
      }}
      onPress={() => unsubscribe(podcast)}
    >
      <Ionicons name="trash-outline" size={30} color="#fff" />
    </TouchableOpacity>
  )
}

export default UnsubscribeRowUnderlay
