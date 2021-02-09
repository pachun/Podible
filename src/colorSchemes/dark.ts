import { PlatformColor } from "react-native"

// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color

const darkMode = {
  name: "dark",

  keyboardAppearance: "dark",
  background: "#101010",
  button: PlatformColor("systemPink"),
  loud: PlatformColor("systemOrange"),

  dropShadow: {
    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
}

export default darkMode
