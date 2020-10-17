import ReactNativeTrackPlayerPlaybackService from "../../src/setup-react-native-track-player/react-native-track-player-playback-service"

const mockAddEventListener = jest.fn()

jest.mock("react-native-track-player", () => ({
  addEventListener: (arg1: any, arg2: any) => mockAddEventListener(arg1, arg2),
  play: "TrackPlayer.play",
  pause: "TrackPlayer.pause",
}))

describe("ReactNativeTrackPlayerPlaybackService()()", () => {
  it("enables playing and pausing audio on the lockscreen", async () => {
    await ReactNativeTrackPlayerPlaybackService()()

    expect(mockAddEventListener).toHaveBeenCalledTimes(2)
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-play",
      "TrackPlayer.play",
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-pause",
      "TrackPlayer.pause",
    )
  })
})
