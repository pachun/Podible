import * as RNAppearance from "react-native-appearance"
import colorSchemes from "../colorSchemes"

const useColorScheme = (): any => {
  const operatingSystemReportedColorScheme = RNAppearance.useColorScheme()

  const colorSchemeName =
    operatingSystemReportedColorScheme === "no-preference"
      ? "default"
      : operatingSystemReportedColorScheme

  return colorSchemes[colorSchemeName]
}

export default useColorScheme
