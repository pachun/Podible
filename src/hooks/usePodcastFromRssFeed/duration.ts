const secondsInAnHour = 3600
const secondsInAMinute = 60

const duration = (podcastEpisodeFromRssFeed: any) => {
  const duration = podcastEpisodeFromRssFeed["itunes:duration"]?.[0]
  if (!duration) return 0
  if (duration.includes(":")) {
    const parts = duration.split(":").map((part: string) => parseInt(part, 10))
    if (parts.length === 3) {
      const numberOfHours = parts[0]
      const numberOfMinutes = parts[1]
      const numberOfSeconds = parts[2]
      return (
        numberOfHours * secondsInAnHour +
        numberOfMinutes * secondsInAMinute +
        numberOfSeconds
      )
    }
    const numberOfMinutes = parts[0]
    const numberOfSeconds = parts[1]
    return numberOfMinutes * secondsInAMinute + numberOfSeconds
  }
  return parseInt(duration, 10)
}

export default duration
