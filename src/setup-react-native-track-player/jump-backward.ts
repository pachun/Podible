import TrackPlayer from "react-native-track-player"

const jumpForward = async ({
  interval,
}: {
  interval: number
}): Promise<void> => {
  const currentPosition = await TrackPlayer.getPosition()
  await TrackPlayer.seekTo(currentPosition - interval)
}

export default jumpForward
