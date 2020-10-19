import React from "react"
import { fireEvent, waitFor, render } from "@testing-library/react-native"
import { PodcastSearchResultFactory } from "./helpers/factories"
import { mockFetch } from "./helpers/mocks"

import Provider from "../src/Provider"
import Episodes from "../src/Episodes"

const mockTrackPlayerStop = jest.fn()
const mockTrackPlayerAdd = jest.fn()
const mockTrackPlayerPlay = jest.fn()

jest.mock("react-native-track-player", () => ({
  stop: () => mockTrackPlayerStop(),
  add: (arg: any) => mockTrackPlayerAdd(arg),
  play: () => mockTrackPlayerPlay(),
}))

describe("The Episodes Screen", () => {
  it("plays episodes when they're tapped", async () => {
    const podcastSearchResult = PodcastSearchResultFactory({
      rssFeedUrl: "some.feed.url.A",
    })

    mockFetch(
      "some.feed.url.A",
      `
      <rss>
        <channel>
          <title>title A</title>
          <itunes:author>publisher A</itunes:author>
          <description>description A</description>
          <image><url>artworkUrlA</url></image>
          <item>
            <itunes:title>podcast A episode 1 title</itunes:title>
            <pubDate>Mon, 21 Sep 2019 16:45:00 -0000</pubDate>
            <itunes:summary>podcast A episode 1 description</itunes:summary>
            <itunes:duration>2474</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
        </channel>
      </rss>
      `,
    )

    const { getByText, getByTestId } = render(
      <Provider>
        <Episodes
          route={{
            key: "",
            name: "Episodes",
            params: { podcastSearchResult },
          }}
        />
      </Provider>,
    )

    await waitFor(() => getByTestId("Podcast Artwork"))

    fireEvent(getByText("podcast A episode 1 title"), "press")

    expect(mockTrackPlayerStop).toHaveBeenCalledTimes(1)
    expect(mockTrackPlayerAdd).toHaveBeenCalledWith([
      {
        id: "mp3.url",
        title: "podcast A episode 1 title",
        artist: "publisher A",
        artwork: "artworkUrlA",
        url: "mp3.url",
      },
    ])
    expect(mockTrackPlayerPlay).toHaveBeenCalledTimes(1)
  })

  it("shows a loading spinner until the podcast episodes are loaded", async () => {
    const podcastSearchResult = PodcastSearchResultFactory({
      rssFeedUrl: "url",
    })

    mockFetch(
      "url",
      `
      <rss>
        <channel>
          <title>title</title>
          <itunes:author>publisher</itunes:author>
          <description>description</description>
          <image><url>artworkUrl</url></image>
          <item>
            <itunes:title></itunes:title>
            <pubDate>Mon, 21 Sep 2019 16:45:00 -0000</pubDate>
            <itunes:summary></itunes:summary>
            <itunes:duration>0</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
        </channel>
      </rss>
      `,
    )

    const { getByTestId, queryAllByTestId } = render(
      <Episodes
        route={{
          key: "",
          name: "Episodes",
          params: { podcastSearchResult },
        }}
      />,
    )

    expect(getByTestId("Loading Spinner"))

    await waitFor(() => getByTestId("Podcast Artwork"))

    expect(queryAllByTestId("Loading Spinner")).toEqual([])
  })

  it("describes podcast A", async () => {
    const podcastSearchResult = PodcastSearchResultFactory({
      rssFeedUrl: "some.feed.url.A",
    })

    mockFetch(
      "some.feed.url.A",
      `
      <rss>
        <channel>
          <title>title A</title>
          <itunes:author>publisher A</itunes:author>
          <description>description A</description>
          <image><url>artworkUrlA</url></image>
          <item>
            <itunes:title>podcast A episode 1 title</itunes:title>
            <pubDate>Mon, 21 Sep 2019 16:45:00 -0000</pubDate>
            <itunes:summary>podcast A episode 1 description</itunes:summary>
            <itunes:duration>2474</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
          <item>
            <itunes:title>podcast A episode 2 title</itunes:title>
            <pubDate>Sun, 20 Sep 2019 12:00:00 -0000</pubDate>
            <itunes:summary>podcast A episode 2 description</itunes:summary>
            <itunes:duration>1111</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
        </channel>
      </rss>
      `,
    )

    const { getByText, getByTestId } = render(
      <Episodes
        route={{
          key: "",
          name: "Episodes",
          params: { podcastSearchResult },
        }}
      />,
    )

    await waitFor(() => getByTestId("Podcast Artwork"))

    expect(getByText("title A"))
    expect(getByText("description A"))
    expect(getByText("PUBLISHER A"))
    expect(getByTestId("Podcast Artwork").props.source.uri).toEqual(
      "artworkUrlA",
    )

    expect(getByText("podcast A episode 1 title"))
    expect(getByText("SEP 21, 2019 · 41:14"))
    expect(getByText("podcast A episode 1 description"))

    expect(getByText("podcast A episode 2 title"))
    expect(getByText("SEP 20, 2019 · 18:31"))
    expect(getByText("podcast A episode 2 description"))
  })

  it("describes podcast B", async () => {
    const podcastSearchResult = PodcastSearchResultFactory({
      rssFeedUrl: "some.feed.url.B",
    })

    mockFetch(
      "some.feed.url.B",
      `
      <rss>
        <channel>
          <title>title B</title>
          <itunes:author>publisher B</itunes:author>
          <description>description B</description>
          <image><url>artworkUrlB</url></image>
          <item>
            <itunes:title>podcast B episode 1 title</itunes:title>
            <pubDate>Mon, 21 Dec 2018 16:45:00 -0000</pubDate>
            <itunes:summary>podcast B episode 1 description</itunes:summary>
            <itunes:duration>2473</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
          <item>
            <itunes:title>podcast B episode 2 title</itunes:title>
            <pubDate>Sun, 22 Dec 2018 12:00:00 -0000</pubDate>
            <itunes:summary>podcast B episode 2 description</itunes:summary>
            <itunes:duration>1110</itunes:duration>
            <enclosure url="mp3.url"/>
          </item>
        </channel>
      </rss>
      `,
    )

    const { getByText, getByTestId } = render(
      <Episodes
        route={{
          key: "",
          name: "Episodes",
          params: { podcastSearchResult },
        }}
      />,
    )

    await waitFor(() => getByTestId("Podcast Artwork"))

    expect(getByText("title B"))
    expect(getByText("description B"))
    expect(getByText("PUBLISHER B"))
    expect(getByTestId("Podcast Artwork").props.source.uri).toEqual(
      "artworkUrlB",
    )

    expect(getByText("podcast B episode 1 title"))
    expect(getByText("DEC 21, 2018 · 41:13"))
    expect(getByText("podcast B episode 1 description"))

    expect(getByText("podcast B episode 2 title"))
    expect(getByText("DEC 22, 2018 · 18:30"))
    expect(getByText("podcast B episode 2 description"))
  })
})
