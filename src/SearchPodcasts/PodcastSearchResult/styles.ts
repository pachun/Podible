import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  background: {
    width: "90%",
    flexDirection: "row",
  },
  podcastInformation: {
    paddingLeft: 20,
    justifyContent: "center",
  },
  podcastTitle: {
    fontSize: 20,
    fontWeight: "500",
    maxWidth: 250,
  },
  podcastPublisher: {
    fontSize: 12,
    color: "#7f7f7e",
    maxWidth: 250,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
})

export default styles
