import TrackPlayer from "react-native-track-player"

interface Track {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}

export const trackPlayerTrackFromEpisode = (episode: Episode): Track => ({
  id: episode.audio_url,
  title: episode.title,
  artist: episode.publisher,
  artwork: episode.artwork_url,
  url: episode.download_location
    ? episode.download_location
    : episode.audio_url,
})

const trackPlayerIsAlreadyPlayingEpisode = async (
  episode: Episode,
): Promise<boolean> => {
  return episode.audio_url === (await TrackPlayer.getCurrentTrack())
}

export const playEpisode = async (
  episode: Episode,
  setSeekAfterNextPlayEvent: (
    seekAfterNextPlayEvent: SeekAfterNextPlayEvent,
  ) => void,
): Promise<void> => {
  if (episode) {
    if (await trackPlayerIsAlreadyPlayingEpisode(episode)) {
      await TrackPlayer.play()
    } else if (episode.seconds_listened_to === 0) {
      await TrackPlayer.stop()
      await TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
      await TrackPlayer.skip(episode.audio_url)
      await TrackPlayer.play()
    } else {
      const preSeekVolume = await TrackPlayer.getVolume()
      setSeekAfterNextPlayEvent({
        seekTo: episode.seconds_listened_to,
        preSeekVolume,
      })
      await TrackPlayer.setVolume(0)

      await TrackPlayer.stop()
      await TrackPlayer.add([trackPlayerTrackFromEpisode(episode)])
      await TrackPlayer.skip(episode.audio_url)
      await TrackPlayer.play()
    }
  }
}

export const jumpInterval = 30
