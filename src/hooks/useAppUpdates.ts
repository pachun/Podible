import { useState } from "react"
import * as Amplitude from "expo-analytics-amplitude"
import useAppLifecycle from "./useAppLifecycle"
import * as Updates from "expo-updates"

const useAppUpdates = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const update = async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        setIsUpdating(true)
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (reason) {
      Amplitude.logEventWithProperties("App Update Failed", { reason })
    }
    setIsUpdating(false)
  }
  useAppLifecycle({ onLaunch: update, onForeground: update })
  return isUpdating
}

export default useAppUpdates
