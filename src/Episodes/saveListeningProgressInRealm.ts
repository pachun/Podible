import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"

const saveListeningProgressInRealm = async (
  episode: Episode,
  secondsListenedTo: number,
): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    const cachedEpisode = realm.objectForPrimaryKey<Episode>(
      "Episode",
      episode.audio_url,
    )
    cachedEpisode.seconds_listened_to = secondsListenedTo
  })
}

export default saveListeningProgressInRealm
