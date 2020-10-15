import humanReadableDuration from "../src/Episodes/Episode/humanReadableDuration"

describe("humanReadableDuration(secondDuration: number)", () => {
  describe("given hours, minutes, and seconds", () => {
    it("returns a human readable duration", () => {
      const hours = 3
      const minutes = 2
      const seconds = 1
      const secondDuration = hours * 3600 + minutes * 60 + seconds

      expect(humanReadableDuration(secondDuration)).toEqual("3:02:01")
    })
  })

  describe("given minutes and seconds", () => {
    it("returns a human readable duration", () => {
      const minutes = 2
      const seconds = 1
      const secondDuration = minutes * 60 + seconds

      expect(humanReadableDuration(secondDuration)).toEqual("2:01")
    })
  })

  describe("given only seconds", () => {
    it("returns a human readable duration", () => {
      const secondDuration = 2

      expect(humanReadableDuration(secondDuration)).toEqual("2 SECONDS")
    })
  })
})
