// https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project
import "react-native-gesture-handler"

// https://docs.expo.io/bare/installing-updates/
import "expo-asset"

// sentry crash reporting
// https://docs.expo.io/guides/using-sentry/

import * as Sentry from "sentry-expo"

Sentry.init({
  dsn:
    "https://26f0359c21ca483985c9bc168161f67a@o538660.ingest.sentry.io/5657023",
})

// --

import App from "./src/App"

export default App
