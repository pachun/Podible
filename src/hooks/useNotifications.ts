import { useEffect } from "react"
import * as Notifications from "expo-notifications"

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
      },
    )
    return () => subscription.remove()
  }, [navigation, setCurrentlyPlayingEpisode])
}

export default useNotifications
