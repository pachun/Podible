import dark from "./dark"
import light from "./light"
import shared from "./shared"

export default {
  light: { ...shared, ...light },
  dark: { ...shared, ...dark },
  default: { ...shared, ...light },
}
