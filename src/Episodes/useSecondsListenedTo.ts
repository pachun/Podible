import { useCallback, useEffect } from "react"
import TrackPlayer from "react-native-track-player"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"
import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"
import saveListeningProgressInRealm from "./saveListeningProgressInRealm"

const everySecond = 1000

interface UseSecondsListenedToProps {
  playbackState: string
  currentlyPlayingEpisode: Episode
  setSecondsListenedTo: (secondsListenedTo: number) => void
}

const useSecondsListenedTo = ({
  playbackState,
  currentlyPlayingEpisode,
  setSecondsListenedTo,
}: UseSecondsListenedToProps): void => {
  const { position } = useTrackPlayerProgress(everySecond)

  const updateSecondsListenedTo = useCallback(async () => {
    const trackPlayerEpisodesAudioUrl = await TrackPlayer.getCurrentTrack()
    if (!trackPlayerEpisodesAudioUrl) return
    const realm = await Realm.open(realmConfiguration)
    const trackPlayerEpisode = realm.objectForPrimaryKey<Episode>(
      "Episode",
      trackPlayerEpisodesAudioUrl,
    )
    const trackPlayerIsPlayingTheRequestedEpisode =
      currentlyPlayingEpisode?.audio_url === trackPlayerEpisode.audio_url
    const seekHasFinishedOrEpisodeHasBegunPlaying = position > 0
    if (
      trackPlayerIsPlayingTheRequestedEpisode &&
      seekHasFinishedOrEpisodeHasBegunPlaying
    ) {
      saveListeningProgressInRealm(currentlyPlayingEpisode, position)
      setSecondsListenedTo(position)
    }
  }, [position, currentlyPlayingEpisode, setSecondsListenedTo])

  useEffect(() => {
    if (playbackState === "playing") {
      updateSecondsListenedTo()
    }
  }, [updateSecondsListenedTo, playbackState])
}

export default useSecondsListenedTo
