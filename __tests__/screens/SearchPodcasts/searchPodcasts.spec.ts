import searchPodcasts from "../../../src/screens/SearchPodcasts/searchPodcasts"
import mockFetch from "../../helpers/mockFetch"

describe("async searchPodcasts(searchTerm: string): PodcastSearchResult[]", () => {
  it("searches Apple's podcasts", async () => {
    const trueFetch = global.fetch

    mockFetch(`https://itunes.apple.com/search?media=podcast&term=Politics`, {
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
    })

    expect(await searchPodcasts("Politics")).toEqual([
      {
        title: "Political Podcast 1",
        publisher: "Political Publisher 1",
        imageUrl: "url1.politics",
      },
      {
        title: "Political Podcast 2",
        publisher: "Political Publisher 2",
        imageUrl: "url2.politics",
      },
    ])

    mockFetch(`https://itunes.apple.com/search?media=podcast&term=Business`, {
      results: [
        {
          collectionName: "Business Podcast 1",
          artworkUrl600: "url1.business",
          artistName: "Business Publisher 1",
        },
        {
          collectionName: "Business Podcast 2",
          artworkUrl600: "url2.business",
          artistName: "Business Publisher 2",
        },
      ],
    })

    expect(await searchPodcasts("Business")).toEqual([
      {
        title: "Business Podcast 1",
        publisher: "Business Publisher 1",
        imageUrl: "url1.business",
      },
      {
        title: "Business Podcast 2",
        publisher: "Business Publisher 2",
        imageUrl: "url2.business",
      },
    ])

    global.fetch = trueFetch
  })
})
