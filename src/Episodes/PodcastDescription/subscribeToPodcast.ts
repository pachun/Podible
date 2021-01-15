import Realm from "realm"
import realmConfiguration from "../../realmConfiguration"

const subscribeToPodcast = async (podcast: Podcast): Promise<void> => {
  const realm = await Realm.open(realmConfiguration)
  realm.write(() => {
    realm.create("SubscribedPodcast", { podcast_id: podcast.id })
  })
}

export default subscribeToPodcast
