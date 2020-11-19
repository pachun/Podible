const artworkUrl = (rss: any) => {
  if (rss?.["rss"]?.["channel"]?.[0]?.["image"]?.[0]?.["url"]?.[0]) {
    return rss["rss"]["channel"][0]["image"][0]["url"][0]
  } else if (
    rss["rss"]?.["channel"]?.[0]?.["itunes:image"]?.[0]?.["$"]?.["href"]
  ) {
    return rss["rss"]["channel"][0]["itunes:image"][0]["$"]["href"]
  }
}

export default artworkUrl
