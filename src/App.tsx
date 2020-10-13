import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SearchPodcasts from "./SearchPodcasts"
import PodcastEpisodes from "./PodcastEpisodes"

const Stack = createStackNavigator<RouteParams>()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Search Podcasts" component={SearchPodcasts} />
      <Stack.Screen
        name="Podcast Episodes"
        component={PodcastEpisodes}
        options={({ route }) => ({
          title: route.params.podcastSearchResult.title,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
