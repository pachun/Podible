import React from "react"
import { render } from "@testing-library/react-native"
import PodcastSearchResult from "../../../src/screens/SearchPodcasts/PodcastSearchResult"

test("shows album artwork", () => {
  const podcastSearchResult1: PodcastSearchResult = {
    title: "",
    publisher: "",
    imageUrl: "image.url.1",
  }

  const { getByTestId } = render(
    <PodcastSearchResult podcastSearchResult={podcastSearchResult1} />,
  )

  const image = getByTestId("image")

  expect(image.props.source).toEqual({ uri: "image.url.1" })
})
