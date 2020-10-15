import React from "react"
import { fireEvent, waitFor, render } from "@testing-library/react-native"
import { mockFetch } from "./helpers/mocks"

import Search from "../src/Search"

describe("The Search Screen", () => {
  it("searches for political podcasts", async () => {
    const searchText = "Politics"

    mockFetch(
      `https://itunes.apple.com/search?media=podcast&term=${searchText}`,
      {
        results: [
          {
            collectionName: "Political Podcast 1",
            artworkUrl600: "url1.politics",
            artistName: "Political Publisher 1",
          },
          {
            collectionName: "Political Podcast 2",
            artworkUrl600: "url2.politics",
            artistName: "Political Publisher 2",
          },
        ],
      },
    )

    const { queryAllByTestId, getByText, getByPlaceholderText } = render(
      <Search navigation={{}} />,
    )

    const searchField = getByPlaceholderText("Search")

    fireEvent(searchField, "onChangeText", searchText)

    await waitFor(() => getByText("Political Podcast 1"))

    expect(getByText("Political Podcast 1"))
    expect(getByText("POLITICAL PUBLISHER 1"))
    expect(queryAllByTestId("Podcast Artwork")[0].props.source.uri).toEqual(
      "url1.politics",
    )
    expect(getByText("Political Podcast 2"))
    expect(getByText("POLITICAL PUBLISHER 2"))
    expect(queryAllByTestId("Podcast Artwork")[1].props.source.uri).toEqual(
      "url2.politics",
    )
  })

  it("searches for entrepreneurial podcasts", async () => {
    const searchText = "Entrepreneur"

    mockFetch(
      `https://itunes.apple.com/search?media=podcast&term=${searchText}`,
      {
        results: [
          {
            collectionName: "Entrepreneurial Podcast 1",
            artworkUrl600: "url1.entrepreneurial",
            artistName: "Entrepreneurial Publisher 1",
          },
          {
            collectionName: "Entrepreneurial Podcast 2",
            artworkUrl600: "url2.entrepreneurial",
            artistName: "Entrepreneurial Publisher 2",
          },
        ],
      },
    )

    const { getByPlaceholderText, queryAllByTestId, getByText } = render(
      <Search navigation={{}} />,
    )

    const searchField = getByPlaceholderText("Search")

    fireEvent(searchField, "onChangeText", searchText)

    await waitFor(() => getByText("Entrepreneurial Podcast 1"))

    expect(getByText("Entrepreneurial Podcast 1"))
    expect(getByText("ENTREPRENEURIAL PUBLISHER 1"))
    expect(queryAllByTestId("Podcast Artwork")[0].props.source.uri).toEqual(
      "url1.entrepreneurial",
    )
    expect(getByText("Entrepreneurial Podcast 2"))
    expect(getByText("ENTREPRENEURIAL PUBLISHER 2"))
    expect(queryAllByTestId("Podcast Artwork")[1].props.source.uri).toEqual(
      "url2.entrepreneurial",
    )
  })

  describe("when a podcast search result is tapped", () => {
    it("shows its podcast episodes ", async () => {
      const searchText = "Politics"

      mockFetch(
        `https://itunes.apple.com/search?media=podcast&term=${searchText}`,
        {
          results: [
            {
              collectionName: "Political Podcast 1",
              artworkUrl600: "url1.politics",
              artistName: "Political Publisher 1",
              feedUrl: "feed.url",
            },
          ],
        },
      )

      const navigationMock = {
        navigate: jest.fn(),
      }

      const { getByPlaceholderText, getByText } = render(
        <Search navigation={navigationMock} />,
      )

      const searchField = getByPlaceholderText("Search")

      fireEvent(searchField, "onChangeText", searchText)

      await waitFor(() => getByText("Political Podcast 1"))

      fireEvent(getByText("Political Podcast 1"), "press")

      expect(navigationMock.navigate).toBeCalledWith("Episodes", {
        podcastSearchResult: {
          title: "Political Podcast 1",
          publisher: "Political Publisher 1",
          artworkUrl: "url1.politics",
          rssFeedUrl: "feed.url",
        },
      })
    })
  })
})
