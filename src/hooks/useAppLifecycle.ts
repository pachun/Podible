import { useCallback, useEffect, useRef } from "react"
import { AppState, AppStateStatus } from "react-native"

interface Props {
  onForeground?: () => void
  onLaunch?: () => void
}

const appIsBeingForegrounded = (
  nextAppState: AppStateStatus,
  currentAppState: AppStateStatus,
) => currentAppState.match(/inactive|background/) && nextAppState === "active"

const noOperation = () => {}

const useAppLifecycle = ({
  onForeground = noOperation,
  onLaunch = noOperation,
}: Props): void => {
  const appState = useRef(AppState.currentState)
  const respondToLifecycleUpdates = useCallback(() => {
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appIsBeingForegrounded(nextAppState, appState.current)) onForeground()
      appState.current = nextAppState
    }

    AppState.addEventListener("change", _handleAppStateChange)
    return () => AppState.removeEventListener("change", _handleAppStateChange)
  }, [onForeground])

  useEffect(() => {
    respondToLifecycleUpdates()
  }, [respondToLifecycleUpdates])
  useEffect(() => {
    onLaunch()
  }, [onLaunch])
}

export default useAppLifecycle
