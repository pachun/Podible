import React, { ReactElement } from "react"
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
}: SearchFieldProps): ReactElement => {
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
        autoFocus={true}
        placeholder="Search"
        style={styles.searchField}
        value={searchFieldText}
        onChangeText={setSearchFieldText}
        returnKeyType="done"
        autoCorrect={false}
        keyboardAppearance={colorSchemeName}
        placeholderTextColor={colorScheme.searchFieldForeground}
      />
      {searchFieldText !== "" && (
        <TouchableOpacity
          onPress={() => setSearchFieldText("")}
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
