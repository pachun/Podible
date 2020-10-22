import ReactNativeTrackPlayerPlaybackService from "../../src/setup-react-native-track-player/react-native-track-player-playback-service"

const mockJumpBackward = jest.fn()
jest.mock(
  "../../src/setup-react-native-track-player/jump-backward",
  () => mockJumpBackward,
)

const mockJumpForward = jest.fn()
jest.mock(
  "../../src/setup-react-native-track-player/jump-forward",
  () => mockJumpForward,
)

const mockAddEventListener = jest.fn()
jest.mock("react-native-track-player", () => ({
  addEventListener: (arg1: any, arg2: any) => mockAddEventListener(arg1, arg2),
  play: "TrackPlayer.play",
  pause: "TrackPlayer.pause",
  stop: "TrackPlayer.destroy",
}))

describe("ReactNativeTrackPlayerPlaybackService()()", () => {
  it("enables playing, pausing, and skipping audio on the lockscreen", async () => {
    await ReactNativeTrackPlayerPlaybackService()()

    expect(mockAddEventListener).toHaveBeenCalledTimes(5)
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-play",
      "TrackPlayer.play",
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-pause",
      "TrackPlayer.pause",
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-stop",
      "TrackPlayer.destroy",
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-jump-forward",
      mockJumpForward(),
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "remote-jump-backward",
      mockJumpBackward(),
    )
  })
})
