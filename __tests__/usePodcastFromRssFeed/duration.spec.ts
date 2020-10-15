import duration from "../../src/hooks/usePodcastFromRssFeed/duration"

describe("title(podcastEpisodeFromRssFeed)", () => {
  describe("the episode's <itunes:duration> xml attribute is an integer", () => {
    it("returns the episode's <itunes:duration> xml attribute", () => {
      const podcastEpisodeFromRssFeed = {
        "itunes:duration": ["10"],
      }

      expect(duration(podcastEpisodeFromRssFeed)).toEqual(10)
    })
  })

  describe("the episode does not have an <itunes:duration> xml attribute", () => {
    it("returns 0", () => {
      const podcastEpisodeFromRssFeed = {}

      expect(duration(podcastEpisodeFromRssFeed)).toEqual(0)
    })
  })

  describe("the episode's <itunes:duration> xml attribute is pre-formatted hh:mm:ss", () => {
    it("returns the number of seconds the format represents", () => {
      const podcastEpisodeFromRssFeed = {
        "itunes:duration": ["01:01:01"],
      }

      expect(duration(podcastEpisodeFromRssFeed)).toEqual(3661)
    })
  })

  describe("the episode's <itunes:duration> xml attribute is pre-formatted mm:ss", () => {
    it("returns the number of seconds the format represents", () => {
      const podcastEpisodeFromRssFeed = {
        "itunes:duration": ["01:01"],
      }

      expect(duration(podcastEpisodeFromRssFeed)).toEqual(61)
    })
  })
})
