import TrackPlayer from "react-native-track-player"
import Realm from "realm"
import realmConfiguration from "./realmConfiguration"

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

export const episodeFromPlaybackState = async (
  playbackState: PlaybackState,
): Promise<Episode | undefined> => {
  if (playbackState.name === "playing" || playbackState.name === "paused") {
    const audioUrl = playbackState.episodesAudioUrl
    const realm = await Realm.open(realmConfiguration)
    const episode = realm.objectForPrimaryKey<Episode>("Episode", audioUrl)
    return episode
  }
  return undefined
}

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
  seekPosition?: number,
): Promise<void> => {
  if (episode) {
    const alreadyPlayingEpisode = await trackPlayerIsAlreadyPlayingEpisode(
      episode,
    )
    const wasScrubbed = Boolean(seekPosition)
    if (alreadyPlayingEpisode && !wasScrubbed) {
      await TrackPlayer.play()
    } else if (alreadyPlayingEpisode && wasScrubbed) {
      const preSeekVolume = await TrackPlayer.getVolume()
      setSeekAfterNextPlayEvent({
        seekTo: seekPosition,
        preSeekVolume,
      })
      await TrackPlayer.setVolume(0)
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
