import React, { ReactElement } from "react"
import { ScrollView, Text, View } from "react-native"
import ShowHtml from "../../../ShowHtml"
import useStyles from "./useStyles"

interface EpisodeDescriptionProps {
  episode: Episode
}

const EpisodeDescription = ({
  episode,
}: EpisodeDescriptionProps): ReactElement => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{episode.title}</Text>
        <ShowHtml html={episode.description} />
      </ScrollView>
    </View>
  )
}

export default React.memo(EpisodeDescription)
