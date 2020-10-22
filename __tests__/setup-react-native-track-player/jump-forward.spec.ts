import jumpForward from "../../src/setup-react-native-track-player/jump-forward"

const mockGetPosition = jest.fn()
const mockSeekTo = jest.fn()
jest.mock("react-native-track-player", () => ({
  getPosition: () => mockGetPosition(),
  seekTo: (position: number) => mockSeekTo(position),
}))

describe("jumpForward", () => {
  it("jumps forward using the specified interval", async () => {
    mockGetPosition.mockImplementation(() => 10)

    await jumpForward({ interval: 10 })

    expect(mockSeekTo).toHaveBeenCalledWith(20)

    mockGetPosition.mockImplementation(() => 1)

    await jumpForward({ interval: 2 })

    expect(mockSeekTo).toHaveBeenCalledWith(3)
  })
})
