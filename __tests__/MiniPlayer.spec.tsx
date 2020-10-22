import React, { useEffect } from "react"
import { fireEvent, render, waitFor } from "@testing-library/react-native"

import Provider from "../src/Provider"
import jumpInterval from "../src/setup-react-native-track-player/jump-interval"
import MiniPlayer from "../src/MiniPlayer"

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}))

const mockPlay = jest.fn()
const mockPause = jest.fn()
const mockGetPosition = jest.fn()
const mockSeekTo = jest.fn()
jest.mock("react-native-track-player", () => ({
  TrackPlayerEvents: {
    PLAYBACK_STATE: "playback-state",
  },
  play: () => mockPlay(),
  pause: () => mockPause(),
  getPosition: () => mockGetPosition(),
  seekTo: (arg: number) => mockSeekTo(arg),
}))

const mockUseTrackPlayerEvents = jest.fn()
jest.mock("react-native-track-player/lib/hooks", () => ({
  useTrackPlayerEvents: (
    events: string[],
    handleEvent: ({ state }: { state: string }) => void,
  ) => mockUseTrackPlayerEvents(events, handleEvent),
}))

const mockPlaybackState = (playbackState: string) => {
  mockUseTrackPlayerEvents.mockImplementation(
    (events: string[], handleEvent: ({ state }: { state: string }) => void) => {
      useEffect(() => {
        if (events.includes("playback-state")) {
          handleEvent({ state: playbackState })
        }
      }, [])
    },
  )
}

describe("The Mini Player", () => {
  it("shows a button to skip backward", async () => {
    const position = 50
    mockGetPosition.mockImplementation(() => position)

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    fireEvent(getByTestId("Skip Backward"), "press")

    await waitFor(() =>
      expect(mockSeekTo).toHaveBeenCalledWith(position - jumpInterval),
    )
  })

  it("shows a button to skip forward", async () => {
    const position = 20
    mockGetPosition.mockImplementation(() => position)

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    fireEvent(getByTestId("Skip Forward"), "press")

    await waitFor(() =>
      expect(mockSeekTo).toHaveBeenCalledWith(position + jumpInterval),
    )
  })

  it("shows a pause button when audio is playing", () => {
    mockPlaybackState("paused")

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    expect(getByTestId("Play Button"))

    fireEvent(getByTestId("Play Button"), "press")

    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it("shows a pause button when audio is playing", () => {
    mockPlaybackState("playing")

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    expect(getByTestId("Pause Button"))

    fireEvent(getByTestId("Pause Button"), "press")

    expect(mockPause).toHaveBeenCalledTimes(1)
  })

  it("shows a loading indicator when the podcast is loading", async () => {
    mockPlaybackState("loading")

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    expect(getByTestId("Loading Spinner"))
  })

  it("shows a loading indicator when the podcast is buffering", async () => {
    mockPlaybackState("buffering")

    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    expect(getByTestId("Loading Spinner"))
  })

  it("shows the track's album art", () => {
    const { getByTestId } = render(
      <Provider
        initialState={{
          track: {
            id: "uniqueId",
            title: "",
            artist: "",
            artwork: "artwork.url",
            url: "url",
          },
        }}
      >
        <MiniPlayer />
      </Provider>,
    )

    expect(getByTestId("Currently Playing Artwork").props.source.uri).toEqual(
      "artwork.url",
    )
  })

  describe("when there is no current track", () => {
    it("does not display itself", () => {
      const { queryAllByTestId } = render(
        <Provider initialState={{}}>
          <MiniPlayer />
        </Provider>,
      )

      expect(queryAllByTestId("Mini Player")).toEqual([])
    })
  })
})
