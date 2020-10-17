import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SetupReactNativeTrackPlayer from "./setup-react-native-track-player"
import Search from "./Search"
import Episodes from "./Episodes"

const Stack = createStackNavigator<RouteParams>()

const App = () => {
  const [isReadyToPlayAudio, setIsReadyToPlayAudio] = useState<boolean>(false)

  useEffect(() => {
    const getReadyToPlayAudio = async () => {
      await SetupReactNativeTrackPlayer()
      setIsReadyToPlayAudio(true)
    }
    getReadyToPlayAudio()
  }, [])

  return isReadyToPlayAudio ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Episodes" component={Episodes} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null
}

export default App
