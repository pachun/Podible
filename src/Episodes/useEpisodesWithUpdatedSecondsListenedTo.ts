import { useMemo } from "react"

const updating = (
  currentlyPlayingEpisode: Episode,
  secondsListenedTo: number,
) => (episode: Episode): Episode => {
  return episode.audio_url === currentlyPlayingEpisode.audio_url
    ? {
        id: episode.id,
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
  currentlyPlayingEpisode: Episode
  secondsListenedTo: number
}

const useEpisodesWithUpdatedSecondsListenedTo = ({
  episodes,
  currentlyPlayingEpisode,
  secondsListenedTo,
}: UseEpisodesWithUpdatedSecondsListenedToProps): {
  episodes: Episode[] | undefined
} => {
  return useMemo(() => {
    if (episodes && currentlyPlayingEpisode) {
      return {
        episodes: episodes.map(
          updating(currentlyPlayingEpisode, secondsListenedTo),
        ),
      }
    }
    return { episodes: undefined }
  }, [episodes, currentlyPlayingEpisode, secondsListenedTo])
}

export default useEpisodesWithUpdatedSecondsListenedTo
