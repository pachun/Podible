import React, { ReactElement } from "react"
import { AppearanceProvider } from "react-native-appearance"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useTrackPlayer from "./hooks/useTrackPlayer"
import useAppUpdates from "./hooks/useAppUpdates"
import PodibleStatusBar from "./PodibleStatusBar"
import Loading from "./Loading"
import Provider from "./Provider"
import Search from "./Search"
import Episodes from "./Episodes"
import MiniPlayer from "./MiniPlayer"
import NowPlaying from "./NowPlaying"

const ModalStack = createStackNavigator()
const Stack = createStackNavigator<RouteParams>()
const Tab = createBottomTabNavigator()

const App = (): ReactElement => {
  // eslint-disable-next-line
  const isUpdating = __DEV__ ? false : useAppUpdates()
  const isReadyToPlayAudio = useTrackPlayer()

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

  const allowSwipingDownAnywhereToDismiss = {
    gestureResponseDistance: {
      vertical: 10000,
      horizontal: 10000,
    },
    gestureVelocityImpact: 1,
  }

  const AppWithMiniPlayerAndNowPlayingModal = () => (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="Search" component={AppWithMiniPlayer} />
      <ModalStack.Screen
        name="Now Playing"
        component={NowPlaying}
        options={{
          ...hideHeadersDefaultBottomBorder,
          ...allowSwipingDownAnywhereToDismiss,
        }}
      />
    </ModalStack.Navigator>
  )

  return isReadyToPlayAudio && !isUpdating ? (
    <AppearanceProvider>
      <PodibleStatusBar />
      <Provider>
        <NavigationContainer>
          <AppWithMiniPlayerAndNowPlayingModal />
        </NavigationContainer>
      </Provider>
    </AppearanceProvider>
  ) : (
    <Loading />
  )
}

export default App
