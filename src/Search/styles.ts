import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  podcastSearchResultsList: {
    flex: 1,
  },
  searchFieldContainer: {
    alignItems: "center",
  },
  searchIconContainer: {
    height: "100%",
    justifyContent: "center",
  },
  searchFieldBackground: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e9e9eb",
    borderRadius: 10,
    height: 40,
    width: "90%",
    marginBottom: 5,
    paddingLeft: 10,
  },
  searchField: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
  },
  clearSearchFieldTextButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
})

export default styles
