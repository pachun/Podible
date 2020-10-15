import audioUrl from "../../src/hooks/usePodcastFromRssFeed/audioUrl"

describe("audioUrl(podcastEpisodeFromRssFeed)", () => {
  it("returns the episode's <enclosure url=''/> xml attribute", () => {
    const podcastEpisodeFromRssFeed = {
      enclosure: [{ $: { url: "audio.url" } }],
    }

    expect(audioUrl(podcastEpisodeFromRssFeed)).toEqual("audio.url")
  })

  describe("the episode does not have an <enclosure url='' /> xml attribute", () => {
    it("returns an empty string", () => {
      const podcastEpisodeFromRssFeed = {}

      expect(audioUrl(podcastEpisodeFromRssFeed)).toEqual("")
    })
  })
})
