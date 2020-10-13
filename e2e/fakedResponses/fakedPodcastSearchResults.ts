export default (searchedText: string): PodcastSearchResult[] => {
  if (searchedText === "Ben Shapiro") {
    return [
      {
        title: "The Ben Shapiro Show",
        publisher: "The Daily Wire",
        artworkUrl:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/94/e9/63/94e9631c-887b-dd65-0487-62dde2bacaab/mza_13932341250045832525.jpg/600x600bb.jpg",
        rssFeedUrl: "https://feeds.megaphone.fm/WWO8086402096",
      },
      {
        title: "The Laura Ingraham Podcast",
        publisher: "PodcastOne",
        artworkUrl:
          "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/20/f5/05/20f505aa-4fa0-7616-903c-1b808127568e/mza_6085722710473268494.jpg/600x600bb.jpg",
        rssFeedUrl: "http://www.podcastone.com/podcast?categoryID2=1826",
      },
    ]
  } else if (searchedText === "React Native") {
    return [
      {
        title: "React Native Radio",
        publisher:
          "Jamon Holmgren, Harris Robin Kalash, Robin Heinze, Adhithi Ravichandran",
        artworkUrl:
          "https://is5-ssl.mzstatic.com/image/thumb/Podcasts124/v4/aa/9a/3c/aa9a3cc0-4b7d-e4a4-edf4-d95ccfb2da10/mza_6209480282442557231.jpg/600x600bb.jpg",
        rssFeedUrl: "https://feeds.simplecast.com/hEI_f9Dx",
      },
      {
        title: "The React Native Show Podcast",
        publisher: "Callstack",
        artworkUrl:
          "https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/0d/6a/c8/0d6ac8fb-a8e8-8d76-899e-78848c89f9c9/mza_7869552778057441002.jpg/600x600bb.jpg",
        rssFeedUrl:
          "https://feeds.soundcloud.com/users/soundcloud:users:859563619/sounds.rss",
      },
    ]
  }
  return []
}
