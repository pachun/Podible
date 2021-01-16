import { useEffect } from "react"
import * as Notifications from "expo-notifications"
import { play } from "../AudioControls"

interface UseNotificationsProps {
  setEpisode: (episode: Episode) => void
  navigation: any
}

const useNotifications = ({
  setEpisode,
  navigation,
}: UseNotificationsProps): void => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const episode: Episode = response.notification.request.content.data
          .episode as Episode
        setEpisode(episode)
        navigation.navigate("Now Playing")
        play(episode)
      },
    )
    return () => subscription.remove()
  }, [navigation, setEpisode])
}

export default useNotifications
