import SetupReactNativeTrackPlayer from "../../src/setup-react-native-track-player"
import ReactNativeTrackPlayerPlaybackService from "../../src/setup-react-native-track-player/react-native-track-player-playback-service"

const mockSetupPlayer = jest.fn()
const mockRegisterPlaybackService = jest.fn()
const mockUpdateOptions = jest.fn()

jest.mock("react-native-track-player", () => ({
  setupPlayer: async () => mockSetupPlayer(),
  registerPlaybackService: async (arg: any) => mockRegisterPlaybackService(arg),
  updateOptions: (arg: any) => mockUpdateOptions(arg),
  CAPABILITY_PLAY: "CAPABILITY_PLAY",
  CAPABILITY_PAUSE: "CAPABILITY_PAUSE",
}))

describe("SetupReactNativeTrackPlayer()", () => {
  beforeAll(async () => {
    await SetupReactNativeTrackPlayer()
  })

  it("initializes the react native track player", () => {
    expect(mockSetupPlayer).toHaveBeenCalled()
  })

  it("initializes the react native track players playback service", () => {
    expect(mockRegisterPlaybackService).toHaveBeenCalledWith(
      ReactNativeTrackPlayerPlaybackService,
    )
  })

  it("enables playing and pausing audio", () => {
    expect(mockUpdateOptions).toHaveBeenCalledWith({
      capabilities: ["CAPABILITY_PLAY", "CAPABILITY_PAUSE"],
    })
  })
})
