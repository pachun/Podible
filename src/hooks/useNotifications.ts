import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import { play } from "../shared/trackPlayerHelpers"

interface UseNotificationsProps {
  setCurrentlyPlayingEpisode: (episode: Episode) => void
  navigation: any
}

const useNotifications = ({
  setCurrentlyPlayingEpisode,
  navigation,
}: UseNotificationsProps): void => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const episode: Episode = response.notification.request.content.data
          .episode as Episode
        setCurrentlyPlayingEpisode(episode)
        navigation.navigate("Now Playing")
        play(episode)
      },
    )
    return () => subscription.remove()
  }, [navigation, setCurrentlyPlayingEpisode])
}

export default useNotifications
