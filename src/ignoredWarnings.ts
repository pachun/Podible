import { LogBox } from "react-native"

LogBox.ignoreLogs([
  // sending platform colors to SeeMore dep works, with warning
  "Warning: Failed prop type: Invalid prop `linkColor` of type `object` supplied to `SeeMore`, expected `string`.",

  // sending platform colors to react-native-flash dep works, with warning
  "Warning: Failed prop type: Invalid prop `message.backgroundColor` of type `object` supplied to `ForwardRef`, expected `string`.",

  // https://github.com/react-navigation/react-navigation/issues/7839
  "Sending `onAnimatedValueUpdate` with no listeners registered.",

  // this warning is not correct
  //
  // remote-next is required for RNTrackPlayer to respond to pressing the next-track button on a car's steering wheel
  // if you follow the link they provide in the warning, the documentation says so itself
  "One or more of the events provided to useTrackPlayerEvents is not a valid TrackPlayer event: remote-next. A list of available events can be found at https://react-native-kit.github.io/react-native-track-player/documentation/#events",
])
