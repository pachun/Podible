import Realm from "realm"
import realmConfiguration from "./realmConfiguration"

const realmEpisodeFromReceivedEpisode = async (receivedEpisode: Episode) => {
  const realm = await Realm.open(realmConfiguration)
  const existingPodcastEpisode = realm.objectForPrimaryKey<Episode>(
    "Episode",
    receivedEpisode.audio_url,
  )
  if (existingPodcastEpisode) {
    return existingPodcastEpisode
  } else {
    const realmSavableEpisode = {
      ...receivedEpisode,
      seconds_listened_to: 0,
      podcast: [(receivedEpisode.podcast as unknown) as Podcast],
    }
    realm.write(() => {
      realm.create("Episode", realmSavableEpisode)
    })
    return realmSavableEpisode
  }
}

const openReceivedEpisode = async (
  receivedEpisode: Episode,
  setPlaybackState: (playbackState: PlaybackState) => void,
  navigation: any, // eslint-disable-line
): Promise<void> => {
  const episodeInRealm = await realmEpisodeFromReceivedEpisode(receivedEpisode)
  setPlaybackState({
    name: "paused",
    episodesAudioUrl: episodeInRealm.audio_url,
    secondsListenedTo: 0,
    secondDuration: episodeInRealm.duration,
  })
  navigation.navigate("Now Playing")
}

export default openReceivedEpisode
