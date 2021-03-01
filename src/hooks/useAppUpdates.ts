import { useCallback, useState } from "react"
import useAppLifecycle from "./useAppLifecycle"
import * as Updates from "expo-updates"

const useAppUpdates = (): boolean => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const update = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        setIsUpdating(true)
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (reason) {
      // log an error with sentry
    }
    setIsUpdating(false)
  }, [])
  useAppLifecycle({ onLaunch: update, onForeground: update })
  return isUpdating
}

export default useAppUpdates
