import TrackPlayer, { Track } from "react-native-track-player"

const trackPlayerTrackFromEpisode = (episode: Episode): Track => ({
  id: episode.audioUrl,
  title: episode.title,
  artist: episode.publisher,
  artwork: episode.artworkUrl,
  url: episode.audioUrl,
})

export default trackPlayerTrackFromEpisode
