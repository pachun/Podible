import description from "../../src/hooks/usePodcastFromRssFeed/description"

describe("description(podcastEpisodeFromRssFeed)", () => {
  it("returns the episode's <itunes:summary> xml attribute", () => {
    const podcastEpisodeFromRssFeed = {
      "itunes:summary": ["iTunes Summary"],
    }

    expect(description(podcastEpisodeFromRssFeed)).toEqual("iTunes Summary")
  })

  describe("the episode does not have an <itunes:summary> xml attribute", () => {
    it("returns an empty string", () => {
      const podcastEpisodeFromRssFeed = {}

      expect(description(podcastEpisodeFromRssFeed)).toEqual("")
    })
  })
})
