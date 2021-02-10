import TrackPlayer, { Track } from "react-native-track-player"

const isCurrentEpisode = async (episode: Episode) =>
  (await TrackPlayer.getCurrentTrack()) === episode.audio_url

const playAnEpisodeWhichHasNotBeenStarted = async (episode: Episode) => {
  await TrackPlayer.stop()
  await TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
  await TrackPlayer.skip(episode.audio_url)
  await TrackPlayer.play()
}

const globalAny: any = global
const playAnEpisodeWhichHasBeenStarted = async (episode: Episode) => {
  const originalVolume = await TrackPlayer.getVolume()
  await TrackPlayer.setVolume(0)
  await TrackPlayer.stop()
  await TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
  await TrackPlayer.skip(episode.audio_url)

  globalAny.trackPlayerPlaybackEventListener = TrackPlayer.addEventListener(
    "playback-state",
    async stateObject => {
      if (stateObject.state === TrackPlayer.STATE_PLAYING) {
        await TrackPlayer.seekTo(episode.seconds_listened_to)
        await TrackPlayer.setVolume(originalVolume)
        globalAny.trackPlayerPlaybackEventListener.remove()
      }
    },
  )
  await TrackPlayer.play()
}

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
    if (episode.seconds_listened_to > 0) {
      await playAnEpisodeWhichHasBeenStarted(episode)
    } else {
      await playAnEpisodeWhichHasNotBeenStarted(episode)
    }
  }
}

export const pause = async (): Promise<void> => TrackPlayer.pause()

export const jumpInterval = 30
