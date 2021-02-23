interface Episode {
  id: number
  title: string
  description: string
  published_at: string
  duration: number
  audio_url: string
  artwork_url: string
  publisher: string
  seconds_listened_to: number
  download_location?: string

  // realm always returns a list.
  // there should only ever be 1.
  podcast: Podcast[]
}
