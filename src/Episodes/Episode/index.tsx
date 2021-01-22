import React, { useContext } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import he from "he"
import { PodibleContext } from "../../Provider"
import shortDate from "./shortDate"
import useDurationOrTimeRemainingLabel from "./useDurationOrTimeRemainingLabel"
import useStyles from "./useStyles"
import { play } from "../../shared/trackPlayerHelpers"

const removeHtml = (s: string) =>
  he.decode(unescape(s.replace(/(<([^>]+)>)/gi, "")))

interface EpisodeProps {
  episode: Episode
}

const Episode = ({ episode: displayedEpisode }: EpisodeProps) => {
  const styles = useStyles()
  const navigation = useNavigation()

  const { setCurrentlyPlayingEpisode, currentlyPlayingEpisode } = useContext(
    PodibleContext,
  )

  const durationOrTimeRemainingLabel = useDurationOrTimeRemainingLabel({
    displayedEpisode,
    currentlyPlayingEpisode,
  })

  const playEpisode = async () => {
    setCurrentlyPlayingEpisode(displayedEpisode)
    play(displayedEpisode)
    navigation.navigate("Now Playing")
  }

  return (
    <TouchableOpacity onPress={playEpisode}>
      <View style={styles.container}>
        <View style={styles.background}>
          <Text numberOfLines={2} style={styles.title}>
            {displayedEpisode.title}
          </Text>
          <View style={{ height: 5 }} />
          <Text numberOfLines={1} style={styles.dateAndDuration}>{`${shortDate(
            displayedEpisode.published_at,
          )} · ${durationOrTimeRemainingLabel}`}</Text>
          <View style={{ height: 5 }} />
          <Text numberOfLines={2} style={styles.description}>
            {removeHtml(displayedEpisode.description)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(Episode)
