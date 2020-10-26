import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useAppUpdates from "./hooks/useAppUpdates"
import SetupReactNativeTrackPlayer from "./setup-react-native-track-player"
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
  const isUpdating = useAppUpdates()
  const [isReadyToPlayAudio, setIsReadyToPlayAudio] = useState<boolean>(false)

  useEffect(() => {
    const getReadyToPlayAudio = async () => {
      await SetupReactNativeTrackPlayer()
      setIsReadyToPlayAudio(true)
    }
    getReadyToPlayAudio()
  }, [])

  const App = () => (
    <Stack.Navigator>
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
    <Provider>
      <NavigationContainer>
        <AppWithMiniPlayerAndModalPodcastDetails />
      </NavigationContainer>
    </Provider>
  ) : (
    <Loading />
  )
}

export default App
