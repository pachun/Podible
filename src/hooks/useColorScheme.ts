import { useColorScheme } from "react-native"
import colorSchemes from "../colorSchemes"

const useColorScheme2 = (): any => {
  const operatingSystemReportedColorScheme = useColorScheme()

  const colorSchemeName =
    operatingSystemReportedColorScheme === null
      ? "default"
      : operatingSystemReportedColorScheme

  return colorSchemes[colorSchemeName]
}

export default useColorScheme2
