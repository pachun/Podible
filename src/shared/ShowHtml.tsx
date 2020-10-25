import React from "react"
import { Linking } from "react-native"
import HTML from "react-native-render-html"

interface ShowHtmlProps {
  html: string
}

const ShowHtml = ({ html }: ShowHtmlProps) => (
  <HTML
    html={html}
    onLinkPress={(_, href: string) => Linking.openURL(href)}
    tagsStyles={{ a: { fontWeight: "bold" } }}
  />
)

export default ShowHtml
