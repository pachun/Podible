// https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project
import "react-native-gesture-handler"

// https://docs.expo.io/bare/installing-updates/
import "expo-asset"

// crash reporting - bugsnag
import Bugsnag from "@bugsnag/react-native"

!__DEV__ && Bugsnag.start()

// analytics - amplitude
import * as Amplitude from "expo-analytics-amplitude"
import { getUniqueId } from "react-native-device-info"

!__DEV__ && Amplitude.initialize("ab310e06f8d7c2d92e87baaba125bcfa")
!__DEV__ && Amplitude.setUserId(getUniqueId())
!__DEV__ && Amplitude.logEvent("Launched Podible")

// --

import App from "./src/App"

export default App
