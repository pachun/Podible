import React, { useContext } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import * as Haptics from "expo-haptics"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { PodibleContext } from "../Provider"
import JumpForwardButton from "./JumpForwardButton"
import JumpBackwardButton from "./JumpBackwardButton"
import PlayPauseButton from "./PlayPauseButton"
import TrackPlayerSlider from "./TrackPlayerSlider"

const Details = () => {
  const navigation = useNavigation()
  const { episode } = useContext(PodibleContext)

  return (
    <View
      testID="Details"
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync()
          navigation.goBack()
        }}
        style={{
          width: "100%",
          height: 100,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Entypo name="chevron-small-down" size={60} color="black" />
      </TouchableOpacity>
      <Image
        source={{ uri: episode.artworkUrl }}
        style={{
          width: "90%",
          aspectRatio: 1,
          borderRadius: 10,
          marginTop: 20,
        }}
      />
      <View style={{ height: 30 }} />
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          {episode.title}
        </Text>
        <View style={{ height: 10 }} />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 24,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          {episode.publisher}
        </Text>
      </View>
      <View style={{ height: 30 }} />
      <View style={{ width: "80%" }}>
        <TrackPlayerSlider />
      </View>
      <View style={{ height: 30 }} />
      <View
        style={{
          flexDirection: "row",
          width: "60%",
          justifyContent: "space-between",
        }}
      >
        <JumpBackwardButton />
        <PlayPauseButton />
        <JumpForwardButton />
      </View>
      <View style={{ height: 50 }} />
    </View>
  )
}

export default Details
