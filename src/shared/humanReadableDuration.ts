const secondsInAnHour = 3600
const secondsInAMinute = 60

const humanReadableDuration = (secondDuration: number): string => {
  const hours = Math.floor(secondDuration / secondsInAnHour)
  const minutes = Math.floor(
    (secondDuration - hours * secondsInAnHour) / secondsInAMinute,
  )
  const seconds = Math.floor(
    secondDuration - hours * secondsInAnHour - minutes * secondsInAMinute,
  )

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`
}

export default humanReadableDuration
