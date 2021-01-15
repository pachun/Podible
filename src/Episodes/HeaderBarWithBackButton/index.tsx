import React, { ReactElement } from "react"
import { TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"
import styles from "./styles"

interface HeaderBarWithBackButtonProps {
  goBack: () => void
}

const HeaderBarWithBackButton = ({
  goBack,
}: HeaderBarWithBackButtonProps): ReactElement => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <Ionicons
          name="ios-arrow-back"
          size={36}
          color={colorScheme.foreground}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderBarWithBackButton
