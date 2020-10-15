import { by, expect, element } from "detox"

const showPodcastEpisodes = async () => {
  await expect(element(by.id("Search"))).toBeVisible()

  const searchField = await element(by.id("Search Field"))

  await searchField.replaceText("Ben Shapiro")
  await searchField.tapReturnKey()

  await element(by.label("The Ben Shapiro Show")).tap()

  await expect(element(by.id("Search"))).not.toBeVisible()
  await expect(element(by.id("Episodes"))).toBeVisible()
  await expect(
    element(by.label("The Ben Shapiro Show")).atIndex(0),
  ).toBeVisible()
  await expect(element(by.label("THE DAILY WIRE")).atIndex(0)).toBeVisible()
  await expect(
    element(
      by.label(
        "Tired of the lies? Tired of the spin? Are you ready to hear the hard-hitting truth in comprehensive, conservative, principled fashion? The Ben Shapiro Show brings you all the news you need to know in the most fast moving daily program in America. Ben brutally breaks down the culture and never gives an inch! Monday thru Friday.",
      ),
    ),
  ).toBeVisible()

  await element(by.traits(["button"]))
    .atIndex(0)
    .tap()

  await element(by.label("The Laura Ingraham Podcast")).tap()
  await element(by.label("PODCASTONE"))
  await element(
    by.label(
      "You loved her hugely successful radio show and now you can join Laura Ingraham three days a week as she covers politics, pop culture and media bias. And don't worry--as always, she'll still bring you hard-hitting guests and take your calls.",
    ),
  )
}
export default showPodcastEpisodes
