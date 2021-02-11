interface Track {
  id: string
  title: string
  artist: string
  artwork: string
  url: string
}

export const trackPlayerTrackFromEpisode = (episode: Episode): Track => ({
  id: episode.audio_url,
  title: episode.title,
  artist: episode.publisher,
  artwork: episode.artwork_url,
  url: episode.audio_url,
})

export const jumpInterval = 30
