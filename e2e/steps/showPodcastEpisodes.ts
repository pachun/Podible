import { by, expect, element } from "detox"
import {
  backButton,
  expectLabelsToBeVisible,
  expectLabelsNotToBeVisible,
} from "./helpers"

const searchAssertions = [
  {
    searchQuery: "Ben Shapiro",
    results: [
      {
        title: "The Ben Shapiro Show",
        publisher: "THE DAILY WIRE",
        description:
          "Tired of the lies? Tired of the spin? Are you ready to hear the hard-hitting truth in comprehensive, conservative, principled fashion? The Ben Shapiro Show brings you all the news you need to know in the most fast moving daily program in America. Ben brutally breaks down the culture and never gives an inch! Monday thru Friday.",
        episodes: [
          { title: "Supreme Court Apocalypse" },
          {
            title:
              "Matthew Yglesias | The Ben Shapiro Show Sunday Special Ep. 99",
          },
        ],
      },
      {
        title: "The Laura Ingraham Podcast",
        publisher: "PODCASTONE",
        description:
          "You loved her hugely successful radio show and now you can join Laura Ingraham three days a week as she covers politics, pop culture and media bias. And don't worry--as always, she'll still bring you hard-hitting guests and take your calls.",
        episodes: [
          {
            title:
              "“It either ends with the Left destroying Trump, or it ends up with the Left being repudiated” -- Newt Gingrich reveals what’s at stake as the Dems’ ramp up their impeachment mania",
          },
          {
            title:
              "Dems bet the farm on impeachment as Americans and the markets scream “No!” Guests: Pat Buchanan and Peter Schweizer ",
          },
        ],
      },
    ],
  },
]

const searchScreen = element(by.id("Search"))
const episodesScreen = element(by.id("Episodes"))
const searchField = element(by.id("Search Field"))
const theBenShapiroShow = searchAssertions
  .find(searchAssertion => searchAssertion.searchQuery === "Ben Shapiro")
  .results.find(result => result.title === "The Ben Shapiro Show")
const theLauraIngrahamPodcast = searchAssertions
  .find(searchAssertion => searchAssertion.searchQuery === "Ben Shapiro")
  .results.find(result => result.title === "The Laura Ingraham Podcast")

const showPodcastEpisodes = async () => {
  await expect(searchScreen).toBeVisible()

  await searchField.replaceText("Ben Shapiro")
  await searchField.tapReturnKey()
  await element(by.label(theBenShapiroShow.title)).tap()

  await expect(searchScreen).not.toBeVisible()
  await expect(episodesScreen).toBeVisible()
  await expect(
    element(by.label(theBenShapiroShow.title)).atIndex(0),
  ).toBeVisible()
  await expect(
    element(by.label(theBenShapiroShow.publisher)).atIndex(0),
  ).toBeVisible()
  await expect(element(by.label(theBenShapiroShow.description))).toBeVisible()
  await expectLabelsNotToBeVisible(
    theLauraIngrahamPodcast.episodes.map(episode => episode.title),
  )
  await expectLabelsToBeVisible(
    theBenShapiroShow.episodes.map(episode => episode.title),
  )

  await backButton.tap()

  await expect(episodesScreen).not.toBeVisible()
  await expect(searchScreen).toBeVisible()

  await element(by.label(theLauraIngrahamPodcast.title)).tap()

  await expect(episodesScreen).toBeVisible()
  await expect(searchScreen).not.toBeVisible()
  await expect(
    element(by.label(theLauraIngrahamPodcast.title)).atIndex(0),
  ).toBeVisible()
  await expect(
    element(by.label(theLauraIngrahamPodcast.publisher)).atIndex(0),
  ).toBeVisible()
  await expectLabelsToBeVisible(
    theLauraIngrahamPodcast.episodes.map(episode => episode.title),
  )
  await expectLabelsNotToBeVisible(
    theBenShapiroShow.episodes.map(episode => episode.title),
  )
}

export default showPodcastEpisodes
