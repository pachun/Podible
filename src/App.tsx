import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Provider from "./Provider"
import SetupReactNativeTrackPlayer from "./setup-react-native-track-player"
import Search from "./Search"
import Episodes from "./Episodes"
import MiniPlayer from "./MiniPlayer"

const Stack = createStackNavigator<RouteParams>()
const Tab = createBottomTabNavigator()

const App = () => {
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

  return isReadyToPlayAudio ? (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator tabBar={() => <MiniPlayer />}>
          <Tab.Screen name="App" component={App} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  ) : null
}

export default App
