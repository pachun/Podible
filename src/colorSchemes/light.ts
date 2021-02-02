import { PlatformColor } from "react-native"

const lightMode = {
  keyboardAppearance: "light",
  background: "#fff",
  button: PlatformColor("link"),
  loud: PlatformColor("systemIndigo"),

  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
}

export default lightMode
