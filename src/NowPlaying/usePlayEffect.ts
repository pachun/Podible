import { useState, useCallback, useEffect } from "react"
import TrackPlayer from "react-native-track-player"
import { trackPlayerTrackFromEpisode } from "../shared/trackPlayerHelpers"

const usePlayEffect = (
  currentlyPlayingEpisode: Episode,
  playImmediately?: boolean,
  isCurrentTrack?: boolean,
): void => {
  const [isSeekingAfterPlaying, setIsSeekingAfterPlaying] = useState(false)
  const [originalVolume, setOriginalVolume] = useState(1.0)

  const play = useCallback(async () => {
    if (playImmediately && currentlyPlayingEpisode) {
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
  }, [currentlyPlayingEpisode, playImmediately, isCurrentTrack])

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

  useEffect(() => {
    play()
  }, [play])
}

export default usePlayEffect
