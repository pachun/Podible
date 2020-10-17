import podcastFromRss from "../../src/hooks/usePodcastFromRssFeed/podcastFromRss"

describe("podcastFromRss(rss: any)", () => {
  it("removes episodes without audio tracks", () => {
    const rss = {
      rss: {
        channel: [
          {
            title: ["podcast title"],
            "itunes:author": ["podcast publisher"],
            description: ["podcast description"],
            image: [{ url: ["podcast.artwork.url"] }],
            item: [
              {
                title: ["episode with audio"],
                pubDate: [new Date().toString()],
                enclosure: [{ $: { url: "audio.url" } }],
              },
              {
                title: "episode without audio",
                pubDate: [new Date().toString()],
              },
            ],
          },
        ],
      },
    }

    const episodes: Episode[] = podcastFromRss(rss).episodes

    expect(episodes.length).toEqual(1)
    expect(episodes[0].title).toEqual("episode with audio")
  })
})
