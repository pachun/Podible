import React, {
  ReactElement,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import * as Haptics from "expo-haptics"
import { Ionicons } from "@expo/vector-icons"
import TrackPlayer from "react-native-track-player"
import { PodibleContext } from "../Provider"
import { trackPlayerTrackFromEpisode } from "../shared/trackPlayerHelpers"
import useColorScheme from "../hooks/useColorScheme"

interface PlayPauseButtonProps {
  iconSize?: number
  onPlay?: () => void
}

const PlayPauseButton = ({
  iconSize = 50,
  onPlay = () => {},
}: PlayPauseButtonProps): ReactElement => {
  const colorScheme = useColorScheme()

  const { currentlyPlayingEpisode, playbackState } = useContext(PodibleContext)

  const pauseEpisode = () => {
    Haptics.impactAsync()
    TrackPlayer.pause()
  }

  const [isSeekingAfterPlaying, setIsSeekingAfterPlaying] = useState(false)
  const [originalVolume, setOriginalVolume] = useState(1.0)

  const playEpisode = async () => {
    Haptics.impactAsync()
    onPlay()
    const isCurrentTrack =
      currentlyPlayingEpisode.audio_url ===
      (await TrackPlayer.getCurrentTrack())
    if (currentlyPlayingEpisode) {
      if (isCurrentTrack) {
        await TrackPlayer.play()
      } else if (currentlyPlayingEpisode.seconds_listened_to === 0) {
        await TrackPlayer.stop()
        await TrackPlayer.add([
          trackPlayerTrackFromEpisode(currentlyPlayingEpisode),
        ])
        await TrackPlayer.skip(currentlyPlayingEpisode.audio_url)
        await TrackPlayer.play()
      } else {
        setIsSeekingAfterPlaying(true)
        setOriginalVolume(await TrackPlayer.getVolume())
        await TrackPlayer.setVolume(0)

        await TrackPlayer.stop()
        await TrackPlayer.add([
          trackPlayerTrackFromEpisode(currentlyPlayingEpisode),
        ])
        await TrackPlayer.skip(currentlyPlayingEpisode.audio_url)
        await TrackPlayer.play()
      }
    }
  }

  const seekAfterPlaying = useCallback(() => {
    const seekAfterPlayingListener = TrackPlayer.addEventListener(
      "playback-state",
      async (event: TrackPlayerEvent) => {
        if (
          isSeekingAfterPlaying &&
          event.state === TrackPlayer.STATE_PLAYING
        ) {
          setIsSeekingAfterPlaying(false)
          await TrackPlayer.seekTo(currentlyPlayingEpisode.seconds_listened_to)
          await TrackPlayer.play()
          setTimeout(() => {
            TrackPlayer.setVolume(originalVolume)
          }, 200)
        }
      },
    )

    return () => seekAfterPlayingListener.remove()
  }, [
    currentlyPlayingEpisode.seconds_listened_to,
    originalVolume,
    isSeekingAfterPlaying,
  ])

  useEffect(() => seekAfterPlaying(), [seekAfterPlaying])

  return (
    <>
      {playbackState === "playing" && (
        <TouchableOpacity onPress={pauseEpisode}>
          <Ionicons
            name="ios-pause"
            size={iconSize}
            color={colorScheme.button}
          />
        </TouchableOpacity>
      )}
      {(playbackState === "paused" ||
        playbackState === "idle" ||
        playbackState === "ready") && (
        <TouchableOpacity onPress={playEpisode}>
          <Ionicons
            name="ios-play"
            size={iconSize}
            color={colorScheme.button}
          />
        </TouchableOpacity>
      )}
      {(playbackState === "buffering" || playbackState === "loading") && (
        <ActivityIndicator size="large" color={colorScheme.button} />
      )}
    </>
  )
}

export default PlayPauseButton
