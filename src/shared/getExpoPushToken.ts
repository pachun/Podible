import * as Notifications from "expo-notifications"
import * as Constants from "expo-constants"

const experienceId = "@pachun/Podible"
const isDevice = Constants.default.isDevice
const appHasPushPermission = async (): Promise<boolean> =>
  (await Notifications.getPermissionsAsync()).granted
const expoPushToken = async (): Promise<string> =>
  (await Notifications.getExpoPushTokenAsync({ experienceId })).data
const userGivesPushNotificationPermission = async (): Promise<boolean> =>
  (
    await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    })
  ).status === "granted"
export const appHasExpoPushToken = async (): Promise<boolean> =>
  isDevice && (await appHasPushPermission())
const userGivesAppExpoPushToken = async (): Promise<boolean> =>
  isDevice && (await userGivesPushNotificationPermission())

const getExpoPushToken = async (): Promise<string | undefined> => {
  if (await appHasExpoPushToken()) {
    return await expoPushToken()
  } else if (await userGivesAppExpoPushToken()) {
    return await expoPushToken()
  }
}

export default getExpoPushToken
