import jumpBackward from "../../src/setup-react-native-track-player/jump-backward"

const mockGetPosition = jest.fn()
const mockSeekTo = jest.fn()
jest.mock("react-native-track-player", () => ({
  getPosition: () => mockGetPosition(),
  seekTo: (position: number) => mockSeekTo(position),
}))

describe("jumpForward", () => {
  it("jumps forward using the specified interval", async () => {
    mockGetPosition.mockImplementation(() => 20)

    await jumpBackward({ interval: 10 })

    expect(mockSeekTo).toHaveBeenCalledWith(10)

    mockGetPosition.mockImplementation(() => 3)

    await jumpBackward({ interval: 2 })

    expect(mockSeekTo).toHaveBeenCalledWith(1)
  })
})
