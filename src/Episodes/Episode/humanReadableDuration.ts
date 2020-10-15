const secondsInAnHour = 3600
const secondsInAMinute = 60

const leftPadWithZero = (value: number): string =>
  value.toString().length === 1 ? `0${value}` : `${value}`

const humanReadableDuration = (secondDuration: number) => {
  const hours = Math.floor(secondDuration / secondsInAnHour)
  const minutes = Math.floor(
    (secondDuration - hours * secondsInAnHour) / secondsInAMinute,
  )
  const seconds =
    secondDuration - hours * secondsInAnHour - minutes * secondsInAMinute

  if (hours > 0) {
    return `${hours}:${leftPadWithZero(minutes)}:${leftPadWithZero(seconds)}`
  } else if (minutes > 0) {
    return `${minutes}:${leftPadWithZero(seconds)}`
  } else {
    return `${seconds} SECONDS`
  }
}

export default humanReadableDuration
