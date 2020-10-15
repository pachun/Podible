import title from "../../src/hooks/usePodcastFromRssFeed/title"

describe("title(podcastEpisodeFromRssFeed)", () => {
  it("returns the episode's <itunes:title> xml attribute", () => {
    const podcastEpisodeFromRssFeed = {
      "itunes:title": ["iTunes Title"],
    }

    expect(title(podcastEpisodeFromRssFeed)).toEqual("iTunes Title")
  })

  describe("the episode does not have an <itunes:title> xml attribute", () => {
    it("returns the episode's <title> xml attribute", () => {
      const podcastEpisodeFromRssFeed = {
        title: ["Plain Title"],
      }

      expect(title(podcastEpisodeFromRssFeed)).toEqual("Plain Title")
    })
  })
})
