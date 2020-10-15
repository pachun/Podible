import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  podcastArtwork: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  podcastDetailsContainer: {
    alignItems: "center",
  },
  podcastDetailsBackground: {
    width: "90%",
    flexDirection: "row",
  },
  titleLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  publisherLabel: {
    color: "#7f7f7e",
    fontSize: 12,
  },
  podcastDetails: {
    marginLeft: 10,
    flex: 1,
  },
  podcastDescriptionContainer: {
    alignItems: "center",
  },
  podcastDescriptionBackground: {
    width: "90%",
  },
  podcastDescriptionLabel: {
    fontSize: 16,
  },
})

export default styles
