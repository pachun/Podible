import React from "react"
import { waitFor, render } from "@testing-library/react-native"
import { PodcastSearchResultFactory } from "./helpers/factories"
import { mockFetch } from "./helpers/mocks"

import Episodes from "../src/Episodes"

describe("The Episodes Screen", () => {
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
            <description>description A</description>
            <itunes:author>publisher A</itunes:author>
            <image>
              <url>artworkUrlA</url>
            </image>
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
            <description>description B</description>
            <itunes:author>publisher B</itunes:author>
            <image>
              <url>artworkUrlB</url>
            </image>
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
  })
})
