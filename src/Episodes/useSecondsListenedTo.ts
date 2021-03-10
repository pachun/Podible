import { useCallback, useEffect } from "react"
import TrackPlayer from "react-native-track-player"
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks"
import Realm from "realm"
import realmConfiguration from "../shared/realmConfiguration"
import saveListeningProgressInRealm from "./saveListeningProgressInRealm"

const everySecond = 1000

// only runs when:
// the episodes screen is present
// & track player is playing
// & track player's track matches context's episode
// & seconds listened to > 0 (to wait for scrubbing & playback start to finish)
//
// sets secondsListened to in Episodes/index.tsx local state
// updates the episode's seconds_listened_to in realm

// Move all this into a hook in Provider
const useSecondsListenedTo = (
  playbackState: PlaybackState,
  currentlyPlayingEpisode: Episode,
  setSecondsListenedTo: (secondsListenedTo: number) => void,
): void => {
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
    if (playbackState.name === "playing") {
      updateSecondsListenedTo()
    }
  }, [updateSecondsListenedTo, playbackState.name])
}

export default useSecondsListenedTo
