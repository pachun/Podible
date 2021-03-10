import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import openReceivedEpisode from "../shared/openReceivedEpisode"

const useNotifications = (
  setPlaybackState: (playbackState: PlaybackState) => void,
  navigation: any, // eslint-disable-line
): void => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const episode: Episode = response.notification.request.content.data
          .episode as Episode
        openReceivedEpisode(episode, setPlaybackState, navigation)
      },
    )
    return () => subscription.remove()
  }, [navigation, setPlaybackState])
}

export default useNotifications
