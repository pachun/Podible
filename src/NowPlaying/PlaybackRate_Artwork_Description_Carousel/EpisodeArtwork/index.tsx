import React, { ReactElement } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import useStyles from "./useStyles"

interface EpisodeArtworkProps {
  episode: Episode
}

const EpisodeArtwork = ({ episode }: EpisodeArtworkProps): ReactElement => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <FastImage source={{ uri: episode.artwork_url }} style={styles.artwork} />
    </View>
  )
}

export default EpisodeArtwork
