import parseISO from "date-fns/parseISO"

const sortNewestEpisodesFirst = (episodes: Episode[]): Episode[] =>
  Array.from(episodes).sort((e1, e2) =>
    parseISO(e1.published_at) > parseISO(e2.published_at) ? -1 : 1,
  )

export default sortNewestEpisodesFirst
