import React from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import useColorScheme from "../../hooks/useColorScheme"
import colorSchemes from "../../colorSchemes"
import useStyles from "./useStyles"

interface SearchFieldProps {
  searchFieldText: string
  setSearchFieldText: (searchFieldText: string) => void
}

const SearchField = ({
  searchFieldText,
  setSearchFieldText,
}: SearchFieldProps) => {
  const styles = useStyles()
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]
  return (
    <View style={styles.searchFieldBackground}>
      <View style={styles.searchIconContainer}>
        <Ionicons
          name="ios-search"
          size={24}
          color={colorScheme.searchFieldForeground}
        />
      </View>
      <TextInput
        testID="Search Field"
        placeholder="Search"
        style={styles.searchField}
        value={searchFieldText}
        onChangeText={setSearchFieldText}
        returnKeyType="search"
        autoCorrect={false}
        keyboardAppearance={colorSchemeName}
        placeholderTextColor={colorScheme.searchFieldForeground}
      />
      {searchFieldText !== "" && (
        <TouchableOpacity
          onPress={() => setSearchFieldText("")}
          testID="Clear Search Text Button"
          style={styles.clearSearchFieldTextButton}
        >
          <MaterialIcons
            name="cancel"
            size={26}
            color={colorScheme.searchFieldForeground}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchField
