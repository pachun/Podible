import { useEffect, useCallback, useState } from "react"
import { Linking } from "react-native"
import TrackPlayer from "react-native-track-player"
import { trackPlayerTrackFromEpisode } from "../shared/trackPlayerHelpers"
import apiUrl from "../shared/apiUrl"
import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"
import openReceivedEpisode from "../shared/openReceivedEpisode"

interface Link {
  url: string
}

const linkPath = (linkUrl: string) => {
  const linkWithoutPodibleScheme = linkUrl.toLowerCase().split("podible://")[1]
  const linkPath = linkWithoutPodibleScheme.split("/")[0]
  return linkPath
}

const episodeId = (linkUrl: string) => {
  const linkWithoutPodibleScheme = linkUrl.toLowerCase().split("podible://")[1]
  const episodeId = linkWithoutPodibleScheme.split("/")[1]
  return episodeId
}

const sharedEpisodeOrExistingEpisode = async (sharedEpisode: Episode) => {
  const realm = await Realm.open(realmConfiguration)
  const existingPodcastEpisode = realm.objectForPrimaryKey<Episode>(
    "Episode",
    sharedEpisode.audio_url,
  )
  if (existingPodcastEpisode) {
    return existingPodcastEpisode
  } else {
    const sharedEpisodeSavableInRealm = {
      ...sharedEpisode,
      seconds_listened_to: 0,
      podcast: [(sharedEpisode.podcast as unknown) as Podcast],
    }
    realm.write(() => {
      realm.create("Episode", sharedEpisodeSavableInRealm)
    })
    return sharedEpisodeSavableInRealm
  }
}

const useShareLinks = (
  setPlaybackState: (playbackState: PlaybackState) => void,
  navigation: any, // eslint-disable-line
): void => {
  const openSharedEpisode = useCallback(
    async (linkUrl: string) => {
      if (linkPath(linkUrl) === "episodes") {
        const sharedEpisode = await (
          await fetch(`${apiUrl}/episodes/${episodeId(linkUrl)}.json`)
        ).json()
        openReceivedEpisode(sharedEpisode, setPlaybackState, navigation)
      }
    },
    [navigation, setPlaybackState],
  )

  const [appWasOpenedWithLink, setAppWasOpenedWithLink] = useState(false)
  useEffect(() => {
    const openLinkWhenAppIsClosed = () => {
      if (!appWasOpenedWithLink) {
        setAppWasOpenedWithLink(true)
        Linking.getInitialURL().then((url: string) => {
          if (url) {
            openSharedEpisode(url)
          }
        })
      }
    }
    openLinkWhenAppIsClosed()
  }, [appWasOpenedWithLink, openSharedEpisode])

  useEffect(() => {
    const openLinkWhenAppIsOpen = (link: Link) => openSharedEpisode(link.url)
    Linking.addEventListener("url", openLinkWhenAppIsOpen)
    return () => Linking.removeEventListener("url", openLinkWhenAppIsOpen)
  }, [openSharedEpisode])
}

export default useShareLinks
