import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Search from "./Search"
import Episodes from "./Episodes"

const Stack = createStackNavigator<RouteParams>()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Episodes" component={Episodes} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
