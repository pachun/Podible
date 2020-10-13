import { by, expect, element } from "detox"
import { expectLabelsToBeVisible, expectLabelsNotToBeVisible } from "./helpers"

const searchPodcasts = async () => {
  const searchField = await element(by.id("Search Field"))

  await expect(searchField).toBeVisible()

  const benShapiroSearchResults = [
    {
      title: "The Ben Shapiro Show",
      publisher: "The Daily Wire".toUpperCase(),
    },
    {
      title: "The Laura Ingraham Podcast",
      publisher: "PodcastOne".toUpperCase(),
    },
  ]

  await expectLabelsNotToBeVisible(
    benShapiroSearchResults.flatMap(searchResult => [
      searchResult.title,
      searchResult.publisher,
    ]),
  )

  await searchField.tap()
  await searchField.typeText("Ben Shapiro")
  await searchField.tapReturnKey()

  await expectLabelsToBeVisible(
    benShapiroSearchResults.flatMap(searchResult => [
      searchResult.title,
      searchResult.publisher,
    ]),
  )

  const reactNativeSearchResults = [
    {
      title: "React Native Radio",
      publisher: "Jamon Holmgren, Harris Robin Kalash, Robin Heinze, Adhithi Ravichandran".toUpperCase(),
    },
    {
      title: "The React Native Show Podcast",
      publisher: "Callstack".toUpperCase(),
    },
  ]

  await searchField.clearText()
  await searchField.tap()
  await searchField.typeText("React Native")
  await searchField.tapReturnKey()

  await expectLabelsNotToBeVisible(
    benShapiroSearchResults.flatMap(searchResult => [
      searchResult.title,
      searchResult.publisher,
    ]),
  )
  await expectLabelsToBeVisible(
    reactNativeSearchResults.flatMap(searchResult => [
      searchResult.title,
      searchResult.publisher,
    ]),
  )
}

export default searchPodcasts
