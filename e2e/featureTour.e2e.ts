import { searchPodcasts, showPodcastEpisodes } from "./steps"

describe("Podible", () => {
  it("is a working podcast application", async () => {
    await searchPodcasts()
    await showPodcastEpisodes()
  })
})
