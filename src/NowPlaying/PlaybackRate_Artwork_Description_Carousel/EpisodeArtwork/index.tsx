import React, { ReactElement } from "react"
import { View } from "react-native"
import PodibleImage from "../../../PodibleImage"
import useStyles from "./useStyles"

interface EpisodeArtworkProps {
  episode: Episode
}

const EpisodeArtwork = ({ episode }: EpisodeArtworkProps): ReactElement => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <PodibleImage url={episode.artwork_url} style={styles.artwork} />
    </View>
  )
}

export default React.memo(EpisodeArtwork)
