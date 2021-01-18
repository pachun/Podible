import React, { ReactElement, useRef } from "react"
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import useColorScheme from "../../hooks/useColorScheme"
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
  const colorScheme = useColorScheme()

  const searchFieldBackgroundRef = useRef<Animatable.View & View>()
  const cancelButtonRef = useRef<Animatable.View & View>()
  const searchFieldRef = useRef<TextInput>()

  const showTheCancelButton = async () => {
    await searchFieldBackgroundRef.current.transitionTo({ width: "83%" }, 300)
    await cancelButtonRef.current.transitionTo({ opacity: 1.0 })
  }

  const removeTheCancelButton = async () => {
    await searchFieldBackgroundRef.current.transitionTo({ width: "100%" }, 300)
    cancelButtonRef.current.transitionTo({ opacity: 0.0 })
  }

  const removeSearchFieldTextAndFocusSearchField = () => {
    setSearchFieldText("")
    searchFieldRef.current.focus()
  }

  const removeTheCancelButtonIfTheresNoSearchFieldText = () => {
    if (searchFieldText === "") {
      removeTheCancelButton()
    }
  }

  const cancelSearch = () => {
    Keyboard.dismiss()
    setSearchFieldText("")
    removeTheCancelButton()
  }

  return (
    <View style={styles.searchFieldContainer}>
      <Animatable.View
        ref={searchFieldBackgroundRef}
        style={styles.searchFieldBackground}
      >
        <View style={styles.searchIconContainer}>
          <Ionicons
            name="ios-search"
            size={24}
            color={colorScheme.searchFieldForeground}
          />
        </View>
        <TextInput
          ref={searchFieldRef}
          placeholder="Search"
          style={styles.searchField}
          value={searchFieldText}
          onChangeText={setSearchFieldText}
          returnKeyType="done"
          autoCorrect={false}
          keyboardAppearance={colorScheme.keyboardAppearance}
          placeholderTextColor={colorScheme.searchFieldForeground}
          onFocus={showTheCancelButton}
          onBlur={removeTheCancelButtonIfTheresNoSearchFieldText}
        />
        {searchFieldText !== "" && (
          <TouchableOpacity
            onPress={removeSearchFieldTextAndFocusSearchField}
            style={styles.clearSearchFieldTextButton}
          >
            <MaterialIcons
              name="cancel"
              size={26}
              color={colorScheme.searchFieldForeground}
            />
          </TouchableOpacity>
        )}
      </Animatable.View>

      <View style={styles.cancelButtonContainer}>
        <TouchableOpacity
          onPress={cancelSearch}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Animatable.Text
            ref={cancelButtonRef}
            style={styles.cancelButtonLabel}
          >
            Cancel
          </Animatable.Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchField
