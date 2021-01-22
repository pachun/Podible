import React, { ReactElement, useState, useMemo } from "react"
import { View, Image } from "react-native"
import FastImage from "react-native-fast-image"

interface PodibleImageProps {
  url: string
  style?: any
}

const PodibleImage = ({ url, style = {} }: PodibleImageProps): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false)

  const TrueImage = useMemo(
    () => (
      <FastImage
        style={style}
        source={{ uri: url }}
        onLoad={() => setIsLoaded(true)}
      />
    ),
    [style, url],
  )

  const PlaceholderImage = () => (
    <Image
      style={style}
      source={require("../../assets/image-placeholder.png")}
    />
  )

  return (
    <View style={style}>
      {TrueImage}
      {!isLoaded && PlaceholderImage()}
    </View>
  )
}

export default PodibleImage
