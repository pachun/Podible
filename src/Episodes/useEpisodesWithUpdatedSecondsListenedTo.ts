import { useMemo } from "react"

const updating = (playingEpisode: Episode, secondsListenedTo: number) => (
  episode: Episode,
): Episode => {
  return episode.audio_url === playingEpisode.audio_url
    ? {
        title: episode.title,
        description: episode.description,
        published_at: episode.published_at,
        duration: episode.duration,
        audio_url: episode.audio_url,
        artwork_url: episode.artwork_url,
        publisher: episode.publisher,
        seconds_listened_to: secondsListenedTo,
        podcast: episode.podcast,
      }
    : episode
}

interface UseEpisodesWithUpdatedSecondsListenedToProps {
  episodes: Episode[]
  playingEpisode: Episode
  secondsListenedTo: number
}

const useEpisodesWithUpdatedSecondsListenedTo = ({
  episodes,
  playingEpisode,
  secondsListenedTo,
}: UseEpisodesWithUpdatedSecondsListenedToProps): {
  episodes: Episode[] | undefined
} => {
  return useMemo(() => {
    if (episodes && playingEpisode) {
      return {
        episodes: episodes.map(updating(playingEpisode, secondsListenedTo)),
      }
    }
    return { episodes: undefined }
  }, [episodes, playingEpisode, secondsListenedTo])
}

export default useEpisodesWithUpdatedSecondsListenedTo
