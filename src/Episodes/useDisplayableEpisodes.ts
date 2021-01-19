import { useMemo } from "react"
import useEpisodesWithUpdatedSecondsListenedTo from "./useEpisodesWithUpdatedSecondsListenedTo"
import parseISO from "date-fns/parseISO"

const sortNewestEpisodesFirst = (episodes: Episode[]): Episode[] =>
  Array.from(episodes).sort((e1, e2) =>
    parseISO(e1.published_at) > parseISO(e2.published_at) ? -1 : 1,
  )

interface UseEpisodesProps {
  podcast: Podcast
  currentlyPlayingEpisode: Episode
  secondsListenedTo: number
  playbackState: string
}

const useDisplayableEpisodes = ({
  podcast,
  currentlyPlayingEpisode,
  secondsListenedTo,
  playbackState,
}: UseEpisodesProps): Episode[] => {
  const podcastEpisodesExist = useMemo(() => podcast && podcast.episodes, [
    podcast,
  ])

  const newestEpisodesFirst = useMemo(
    () =>
      podcastEpisodesExist
        ? sortNewestEpisodesFirst(podcast.episodes)
        : undefined,
    [podcastEpisodesExist, podcast],
  )

  const {
    episodes: episodesWithUpdatedSecondsListenedTo,
  } = useEpisodesWithUpdatedSecondsListenedTo({
    episodes: newestEpisodesFirst,
    currentlyPlayingEpisode,
    secondsListenedTo,
  })

  const episodes = useMemo(() => {
    if (podcastEpisodesExist && playbackState === "playing") {
      return episodesWithUpdatedSecondsListenedTo
    } else if (podcastEpisodesExist) {
      return newestEpisodesFirst
    }
    return undefined
  }, [
    podcastEpisodesExist,
    playbackState,
    newestEpisodesFirst,
    episodesWithUpdatedSecondsListenedTo,
  ])

  return episodes
}

export default useDisplayableEpisodes
