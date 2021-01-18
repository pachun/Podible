import React, { ReactElement } from "react"
import { TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import useColorScheme from "../../hooks/useColorScheme"
import styles from "./styles"

interface HeaderBarWithBackButtonProps {
  goBack: () => void
}

const HeaderBarWithBackButton = ({
  goBack,
}: HeaderBarWithBackButtonProps): ReactElement => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <Ionicons name="ios-arrow-back" size={36} color={colorScheme.button} />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderBarWithBackButton
