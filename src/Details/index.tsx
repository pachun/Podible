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
import styles from "./styles"

const Details = () => {
  const navigation = useNavigation()
  const { episode } = useContext(PodibleContext)
  const goBack = () => {
    Haptics.impactAsync()
    navigation.goBack()
  }

  return (
    <View testID="Details" style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Entypo name="chevron-small-down" size={60} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: episode.artworkUrl }} style={styles.artwork} />
      <View style={{ height: 30 }} />
      <View style={styles.titleAndPublisherContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {episode.title}
        </Text>
        <View style={{ height: 10 }} />
        <Text numberOfLines={1} style={styles.publisher}>
          {episode.publisher}
        </Text>
      </View>
      <View style={{ height: 30 }} />
      <View style={styles.sliderContainer}>
        <TrackPlayerSlider />
      </View>
      <View style={{ height: 30 }} />
      <View style={styles.playbackControlsContainer}>
        <JumpBackwardButton />
        <PlayPauseButton />
        <JumpForwardButton />
      </View>
      <View style={{ height: 50 }} />
    </View>
  )
}

export default Details
