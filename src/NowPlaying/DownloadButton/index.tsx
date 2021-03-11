import React from "react"
import { Text, TouchableOpacity } from "react-native"
import * as FileSystem from "expo-file-system"
import { Ionicons } from "@expo/vector-icons"
import Realm from "realm"
import realmConfiguration from "../../shared/realmConfiguration"
import { PodibleContext } from "../../Provider"
import useColorScheme from "../../hooks/useColorScheme"

const DownloadButton = (): React.ReactElement => {
  const colorScheme = useColorScheme()

  const { currentlyPlayingEpisode } = React.useContext(PodibleContext)
  // const currentlyPlayingEpisode = useCurrentlyPlayingEpisode(PodibleContext)

  const [downloadStarted, setDownloadStarted] = React.useState(false)
  const [downloadProgress, setDownloadProgress] = React.useState(0)

  const downloadProgressCallback: FileSystem.DownloadProgressCallback = (
    downloadProgress: FileSystem.DownloadProgressData,
  ) => {
    setDownloadProgress(
      Math.round(
        (downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite) *
          100,
      ),
    )
  }

  const [downloadFinished, setDownloadFinished] = React.useState(false)

  const download = async () => {
    const downloadResumable = FileSystem.createDownloadResumable(
      currentlyPlayingEpisode.audio_url,
      FileSystem.documentDirectory + currentlyPlayingEpisode.id + ".mp3",
      {},
      downloadProgressCallback,
    )
    setDownloadStarted(true)
    const { uri: downloadLocation } = await downloadResumable.downloadAsync()
    const realm = await Realm.open(realmConfiguration)
    const realmEpisode = realm.objectForPrimaryKey<Episode>(
      "Episode",
      currentlyPlayingEpisode.audio_url,
    )
    realm.write(() => {
      realmEpisode.download_location = downloadLocation
    })
    setDownloadFinished(true)
  }

  const [downloaded, setDownloaded] = React.useState(downloadFinished)

  React.useEffect(() => {
    const checkDownloadStatus = async () => {
      const realm = await Realm.open(realmConfiguration)
      const realmEpisode = await realm.objectForPrimaryKey<Episode>(
        "Episode",
        currentlyPlayingEpisode.audio_url,
      )
      setDownloaded(Boolean(realmEpisode.download_location) || downloadFinished)
    }
    checkDownloadStatus()
  }, [currentlyPlayingEpisode.audio_url, downloadFinished])

  if (downloaded) {
    return <Ionicons name="cloud-done" size={24} color={colorScheme.button} />
  } else if (!downloadStarted) {
    return (
      <TouchableOpacity onPress={download}>
        <Ionicons
          name="cloud-download-outline"
          size={24}
          color={colorScheme.button}
        />
      </TouchableOpacity>
    )
  } else if (downloadStarted && !downloadFinished) {
    return (
      <Text style={{ color: colorScheme.button }}>{downloadProgress}%</Text>
    )
  }
}

export default React.memo(DownloadButton)
