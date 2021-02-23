import React, { ReactElement } from "react"
import * as Haptics from "expo-haptics"
import { Dimensions } from "react-native"
import Carousel from "react-native-snap-carousel"
import EpisodeArtwork from "./EpisodeArtwork"
import EpisodeDescription from "./EpisodeDescription"
import PlaybackRate from "./PlaybackRate"

interface Props {
  episode: Episode
}

const PlaybackRate_Artwork_Description_Carousel = ({
  episode,
}: Props): ReactElement => {
  const firstItemIndex = 1

  const data: NowPlayingCarouselTypes[] = [
    {
      type: "playback rate",
    },
    {
      type: "episode artwork",
      episode: episode,
    },
    {
      type: "episode description",
      episode: episode,
    },
  ]

  const renderItem = (item: NowPlayingCarouselTypes): ReactElement => {
    switch (item.type) {
      case "playback rate":
        return <PlaybackRate />
      case "episode artwork":
        return <EpisodeArtwork episode={item.episode} />
      case "episode description":
        return <EpisodeDescription episode={item.episode} />
    }
  }

  return (
    <Carousel
      data={data}
      renderItem={({ item }: any) => renderItem(item)}
      sliderWidth={Dimensions.get("window").width}
      itemWidth={Dimensions.get("window").width * 0.8}
      firstItem={firstItemIndex}
      onBeforeSnapToItem={() => Haptics.impactAsync()}
    />
  )
}

export default React.memo(PlaybackRate_Artwork_Description_Carousel)
