import React, { useEffect, useState } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
import { AppearanceProvider } from "react-native-appearance"
import TrackPlayer from "react-native-track-player"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useAppUpdates from "./hooks/useAppUpdates"
import SetupReactNativeTrackPlayer from "./setup-react-native-track-player"
import PodibleStatusBar from "./PodibleStatusBar"
import Loading from "./Loading"
import Provider from "./Provider"
import Search from "./Search"
import Episodes from "./Episodes"
import MiniPlayer from "./MiniPlayer"
import Details from "./Details"

const ModalStack = createStackNavigator()
const Stack = createStackNavigator<RouteParams>()
const Tab = createBottomTabNavigator()

const App = () => {
  const isUpdating = __DEV__ ? useAppUpdates() : false
  const [isReadyToPlayAudio, setIsReadyToPlayAudio] = useState<boolean>(false)

  useEffect(() => {
    const getReadyToPlayAudio = async () => {
      await SetupReactNativeTrackPlayer()
      setIsReadyToPlayAudio(true)
    }
    getReadyToPlayAudio()
  }, [])

  const audioInterruptionBegan = () => TrackPlayer.pause()

  const audioInterruptionEnded = () => TrackPlayer.play()

  useEffect(() => {
    const audioInterruptions = new NativeEventEmitter(
      NativeModules.AudioInterruptions,
    )
    audioInterruptions.addListener(
      "audioInterruptionBegan",
      audioInterruptionBegan,
    )
    audioInterruptions.addListener(
      "audioInterruptionEnded",
      audioInterruptionEnded,
    )

    return () => {
      audioInterruptions.removeListener(
        "audioInterruptionBegan",
        audioInterruptionBegan,
      )
      audioInterruptions.removeListener(
        "audioInterruptionEnded",
        audioInterruptionEnded,
      )
    }
  }, [])

  const App = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Episodes" component={Episodes} />
    </Stack.Navigator>
  )

  const AppWithMiniPlayer = () => (
    <Tab.Navigator tabBar={() => <MiniPlayer />}>
      <Tab.Screen name="App" component={App} />
    </Tab.Navigator>
  )

  const hideHeadersDefaultBottomBorder = {
    headerStyle: {
      shadowOffset: { height: 0, width: 0 },
    },
  }

  const AppWithMiniPlayerAndModalPodcastDetails = () => (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="Search" component={AppWithMiniPlayer} />
      <ModalStack.Screen
        name="Details"
        component={Details}
        options={hideHeadersDefaultBottomBorder}
      />
    </ModalStack.Navigator>
  )

  return isReadyToPlayAudio && !isUpdating ? (
    <AppearanceProvider>
      <PodibleStatusBar />
      <Provider>
        <NavigationContainer>
          <AppWithMiniPlayerAndModalPodcastDetails />
        </NavigationContainer>
      </Provider>
    </AppearanceProvider>
  ) : (
    <Loading />
  )
}

export default App
