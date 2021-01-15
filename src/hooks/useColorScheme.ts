import * as RNAppearance from "react-native-appearance"

const useColorScheme = (): ColorSchemeType => {
  const colorScheme = RNAppearance.useColorScheme()
  return colorScheme === "no-preference" ? "default" : colorScheme
}

export default useColorScheme
