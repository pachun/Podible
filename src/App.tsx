import React from "react"
import { AppearanceProvider } from "react-native-appearance"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useAudioPlayer from "./hooks/useAudioPlayer"
import useAppUpdates from "./hooks/useAppUpdates"
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
  const isReadyToPlayAudio = useAudioPlayer()

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
