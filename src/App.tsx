import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SearchPodcasts from "./screens/SearchPodcasts"

const Stack = createStackNavigator()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchPodcasts} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
