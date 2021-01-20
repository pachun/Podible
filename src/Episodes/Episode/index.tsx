import React, { useMemo, useContext, useState, useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import he from "he"
import { PodibleContext } from "../../Provider"
import humanReadableDuration from "./humanReadableDuration"
import shortDate from "./shortDate"
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

  const { setCurrentlyPlayingEpisode } = useContext(PodibleContext)

  const [
    durationOrTimeRemainingLabel,
    setDurationOrTimeRemainingLabel,
  ] = useState("")

  const totalEpisodeDurationLabel = useMemo(
    () => humanReadableDuration(displayedEpisode.duration),
    [displayedEpisode.duration],
  )

  const timeRemainingLabel = useMemo(() => {
    const secondsRemaining =
      displayedEpisode.duration - displayedEpisode.seconds_listened_to
    return `${humanReadableDuration(secondsRemaining)} LEFT`
  }, [displayedEpisode.duration, displayedEpisode.seconds_listened_to])

  useEffect(() => {
    const secondsRemaining =
      displayedEpisode.duration - displayedEpisode.seconds_listened_to

    const hasNotListenedOrHasJustBegunListening =
      displayedEpisode.seconds_listened_to < 30
    const hasFinishedListening = secondsRemaining <= 2

    if (hasNotListenedOrHasJustBegunListening) {
      setDurationOrTimeRemainingLabel(totalEpisodeDurationLabel)
    } else if (hasFinishedListening) {
      setDurationOrTimeRemainingLabel("PLAYED")
    } else {
      setDurationOrTimeRemainingLabel(timeRemainingLabel)
    }
  }, [displayedEpisode, totalEpisodeDurationLabel, timeRemainingLabel])

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
