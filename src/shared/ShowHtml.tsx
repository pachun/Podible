import React, { ReactElement } from "react"
import { Linking } from "react-native"
import HTML from "react-native-render-html"
import useColorScheme from "../hooks/useColorScheme"
import colorSchemes from "../colorSchemes"

interface ShowHtmlProps {
  html: string
}

const ShowHtml = ({ html }: ShowHtmlProps): ReactElement => {
  const colorSchemeName = useColorScheme()
  const colorScheme = colorSchemes[colorSchemeName]

  return (
    <HTML
      html={`<p>${html}</p>`}
      onLinkPress={(_, href: string) => Linking.openURL(href)}
      tagsStyles={{
        a: { fontWeight: "bold" },
        p: { color: colorScheme.foreground },
      }}
    />
  )
}

export default ShowHtml
