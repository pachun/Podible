import format from "date-fns/format"
import addDays from "date-fns/addDays"

import shortDate from "../src/Episodes/Episode/shortDate"

describe("shortDate(date: Date)", () => {
  it("returns a human readble date", () => {
    const date = new Date(2000, 0, 1)
    expect(shortDate(date)).toEqual("JAN 1, 2000")
  })

  describe("date is today's date", () => {
    it("it returns 'TODAY'", () => {
      const today = new Date()

      expect(shortDate(today)).toEqual("TODAY")
    })
  })

  describe("date is yesterday's date", () => {
    it("it returns 'YESTERDAY'", () => {
      const yesterday = addDays(new Date(), -1)

      expect(shortDate(yesterday)).toEqual("YESTERDAY")
    })
  })

  describe("date is within the current calendar year", () => {
    it("it returns the date without a year", () => {
      const lastWeek = addDays(new Date(), -7)

      expect(shortDate(lastWeek)).toEqual(
        format(lastWeek, "MMM d").toUpperCase(),
      )
    })
  })
})
