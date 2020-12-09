import { Track } from "react-native-track-player"

const trackPlayerTrackFromEpisode = (episode: Episode): Track => ({
  id: episode.audio_url,
  title: episode.title,
  artist: episode.publisher,
  artwork: episode.artwork_url,
  url: episode.audio_url,
})

export default trackPlayerTrackFromEpisode
