import React, { ReactElement } from "react"
import { Linking } from "react-native"
import HTML from "react-native-render-html"
import useColorScheme from "../hooks/useColorScheme"

interface ShowHtmlProps {
  html: string
}

const ShowHtml = ({ html }: ShowHtmlProps): ReactElement => {
  const colorScheme = useColorScheme()

  return (
    <HTML
      html={`<p>${html}</p>`}
      onLinkPress={(_, href: string) => Linking.openURL(href)}
      tagsStyles={{
        a: { fontWeight: "bold", color: colorScheme.button },
        p: { color: colorScheme.foreground, fontSize: 16 },
      }}
    />
  )
}

export default React.memo(ShowHtml)
