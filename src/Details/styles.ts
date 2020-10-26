import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 10,
  },
  artwork: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  titleAndPublisherContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    maxWidth: "90%",
  },
  publisher: {
    fontSize: 24,
    textAlign: "center",
    maxWidth: "90%",
  },
  sliderContainer: {
    width: "80%",
  },
  playbackControlsContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
  },
})

export default styles
