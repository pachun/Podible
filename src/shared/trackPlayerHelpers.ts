import TrackPlayer from "react-native-track-player"
import { Track } from "react-native-track-player"

const isCurrentEpisode = async (episode: Episode) =>
  (await TrackPlayer.getCurrentTrack()) === episode.audio_url

export const trackPlayerTrackFromEpisode = (episode: Episode): Track => ({
  id: episode.audio_url,
  title: episode.title,
  artist: episode.publisher,
  artwork: episode.artwork_url,
  url: episode.audio_url,
})

export const play = async (episode: Episode): Promise<void> => {
  if (await isCurrentEpisode(episode)) {
    TrackPlayer.play()
  } else {
    await TrackPlayer.stop()
    await TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
    await TrackPlayer.skip(episode.audio_url)

    // begin playing at a seeked-to position (jank below accounts for the open iOS issue):
    // https://github.com/react-native-kit/react-native-track-player/issues/387
    await TrackPlayer.play()
    if (episode.seconds_listened_to > 0) {
      await TrackPlayer.pause()
      setTimeout(async () => {
        await TrackPlayer.seekTo(episode.seconds_listened_to)
        await TrackPlayer.play()
      }, 1000)
    }
  }
}

export const pause = async (): Promise<void> => TrackPlayer.pause()

export const jumpInterval = 30
