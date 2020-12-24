import React, { useContext, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import he from "he"
import { PodibleContext } from "../../Provider"
import humanReadableDuration from "./humanReadableDuration"
import shortDate from "./shortDate"
import useStyles from "./useStyles"
import { play, saveListeningProgress } from "../../AudioControls"

const removeHtml = (s: string) =>
  he.decode(unescape(s.replace(/(<([^>]+)>)/gi, "")))

interface EpisodeProps {
  episode: Episode
}

const Episode = ({ episode: displayedEpisode }: EpisodeProps) => {
  const styles = useStyles()

  const {
    setEpisode,
    episode: currentlyPlayingEpisode,
    playbackState,
  } = useContext(PodibleContext)

  const duration = useMemo(
    () => humanReadableDuration(displayedEpisode.duration),
    [displayedEpisode.duration],
  )

  const playEpisode = async () => {
    if (playbackState === "playing") {
      saveListeningProgress(currentlyPlayingEpisode)
    }
    setEpisode(displayedEpisode)
    play(displayedEpisode)
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
            displayedEpisode.published_on,
          )} · ${duration}`}</Text>
          <View style={{ height: 5 }} />
          <Text numberOfLines={2} style={styles.description}>
            {removeHtml(displayedEpisode.description)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Episode
