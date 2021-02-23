import React, { ReactElement, useRef, useState } from "react"
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import * as Animatable from "react-native-animatable"
import useColorScheme from "../../hooks/useColorScheme"
import useStyles from "./useStyles"

interface SearchFieldProps {
  searchFieldText: string
  setSearchFieldText: (searchFieldText: string) => void
  grabAttention: boolean
}

const SearchField = ({
  searchFieldText,
  setSearchFieldText,
  grabAttention,
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

  const wobbleSearchField = {
    animation: "pulse",
    iterationCount: "infinite" as "infinite",
    iterationDelay: 2000,
  }

  const [editingSearchText, setEditingSearchText] = useState(false)
  const shouldGrabAttention = grabAttention && !editingSearchText

  return (
    <View style={styles.searchFieldContainer}>
      <Animatable.View
        ref={searchFieldBackgroundRef}
        style={styles.searchFieldBackground}
        {...(shouldGrabAttention ? wobbleSearchField : {})}
      >
        <View style={styles.searchIconContainer}>
          <Ionicons
            name="ios-search"
            size={24}
            color={colorScheme.placeholderText}
          />
        </View>
        <TextInput
          onFocus={() => {
            setEditingSearchText(true)
            showTheCancelButton()
          }}
          onBlur={() => {
            setEditingSearchText(false)
            removeTheCancelButtonIfTheresNoSearchFieldText()
          }}
          hitSlop={{ top: 30, left: 30, bottom: 30 }}
          ref={searchFieldRef}
          placeholder="Search"
          style={styles.searchField}
          value={searchFieldText}
          onChangeText={setSearchFieldText}
          returnKeyType="done"
          autoCorrect={false}
          keyboardAppearance={colorScheme.keyboardAppearance}
          placeholderTextColor={colorScheme.placeholderText}
          selectionColor={colorScheme.button}
        />
        {searchFieldText !== "" && (
          <TouchableOpacity
            onPress={removeSearchFieldTextAndFocusSearchField}
            style={styles.clearSearchFieldTextButton}
          >
            <MaterialIcons
              name="cancel"
              size={26}
              color={colorScheme.placeholderText}
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

export default React.memo(SearchField)
