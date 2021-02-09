import React, { ReactElement, useState, useMemo } from "react"
import { View, Image } from "react-native"
import FastImage from "react-native-fast-image"
import useColorScheme from "../hooks/useColorScheme"

interface PodibleImageProps {
  url: string
  style?: any
}

const PodibleImage = ({ url, style = {} }: PodibleImageProps): ReactElement => {
  const colorScheme = useColorScheme()
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
    <View
      style={{
        ...style,
        position: "absolute",
        backgroundColor: colorScheme.differentBackground,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 10,
      }}
    >
      <Image
        style={{ flex: 1, width: "100%", height: "100%" }}
        source={require("../../assets/image-placeholder.png")}
      />
    </View>
  )

  return (
    <View style={style}>
      {TrueImage}
      {!isLoaded && PlaceholderImage()}
    </View>
  )
}

export default PodibleImage
