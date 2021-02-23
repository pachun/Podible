import React, { ReactElement, useRef, useState, useEffect } from "react"
import { Image, View } from "react-native"
import * as Animatable from "react-native-animatable"
import useColorScheme from "../hooks/useColorScheme"
import logo from "../../assets/logo.png"

const Loading = (): ReactElement => {
  const colorScheme = useColorScheme()

  const loadingIconRef = useRef<Animatable.Image & Image>(null)
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    const bounceInAndOut = async () => {
      loadingIconRef.current && (await loadingIconRef.current.flipInX())
      loadingIconRef.current && (await loadingIconRef.current.flipOutY())
      loadingIconRef.current && setIteration(iteration + 1)
    }
    bounceInAndOut()
  }, [iteration])

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorScheme.background,
      }}
    >
      <Animatable.Image
        ref={loadingIconRef}
        source={logo}
        style={{ width: 100, height: 100 }}
      />
      <View style={{ height: 50 }} />
    </View>
  )
}

export default React.memo(Loading)
