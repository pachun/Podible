import React, { ReactElement } from "react"
import { Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import useStyles from "./useStyles"
import useColorScheme from "../../hooks/useColorScheme"

interface EmptyStateCoachingMarksProps {
  isVisible: boolean
}

const EmptyStateCoachingMarks = ({
  isVisible,
}: EmptyStateCoachingMarksProps): ReactElement => {
  const styles = useStyles()
  const colorScheme = useColorScheme()

  return (
    isVisible && (
      <View style={styles.container}>
        <View style={{ height: 50 }} />
        <Animatable.View
          iterationCount="infinite"
          easing="ease-in-out"
          iterationDelay={1000}
        >
          <AntDesign name="arrowup" size={100} color={colorScheme.loud} />
        </Animatable.View>
        <View style={{ height: 30 }} />
        <Text style={styles.directions}>Search for Your Favorite Podcast</Text>
      </View>
    )
  )
}

export default React.memo(EmptyStateCoachingMarks)
