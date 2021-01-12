const secondsInAnHour = 3600
const secondsInAMinute = 60

const humanReadableDuration = (secondDuration: number) => {
  const hours = Math.floor(secondDuration / secondsInAnHour)
  const minutes = Math.floor(
    (secondDuration - hours * secondsInAnHour) / secondsInAMinute,
  )
  const seconds =
    secondDuration - hours * secondsInAnHour - minutes * secondsInAMinute

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`
}

export default humanReadableDuration
