import React from "react"
import { waitFor, render } from "@testing-library/react-native"

import App from "../src/App"

jest.mock("../src/setup-react-native-track-player", () => async () => {})
jest.mock("react-native-track-player", () => ({
  TrackPlayerEvents: {
    PLAYBACK_STATE: "playback-state",
  },
}))
jest.mock("react-native-track-player/lib/hooks", () => ({
  useTrackPlayerEvents: (
    _events: string[],
    _handleEvent: ({ state }: { state: string }) => void,
  ) => jest.fn(),
}))

describe("The App Component", () => {
  it("renders", async () => {
    const { getByTestId } = render(<App />)

    await waitFor(() => getByTestId("Search"))
  })
})
