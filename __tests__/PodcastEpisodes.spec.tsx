import React from "react"
import { waitFor, render } from "@testing-library/react-native"
import { PodcastSearchResultFactory } from "./helpers/factories"
import { mockFetch } from "./helpers/mocks"

import PodcastEpisodes from "../src/PodcastEpisodes"

describe("The Podcast Episodes Screen", () => {
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

    const { getByTestId } = render(
      <PodcastEpisodes
        route={{
          key: "",
          name: "Podcast Episodes",
          params: { podcastSearchResult },
        }}
      />,
    )

    await waitFor(() => getByTestId("Podcast Publisher"))

    expect(getByTestId("Podcast Description").children[0]).toEqual(
      "description A",
    )
    expect(getByTestId("Podcast Publisher").children[0]).toEqual("PUBLISHER A")
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

    const { getByTestId } = render(
      <PodcastEpisodes
        route={{
          key: "",
          name: "Podcast Episodes",
          params: { podcastSearchResult },
        }}
      />,
    )

    await waitFor(() => getByTestId("Podcast Publisher"))

    expect(getByTestId("Podcast Description").children[0]).toEqual(
      "description B",
    )
    expect(getByTestId("Podcast Publisher").children[0]).toEqual("PUBLISHER B")
    expect(getByTestId("Podcast Artwork").props.source.uri).toEqual(
      "artworkUrlB",
    )
  })
})
