const podcastsKeyedByRssFeedUrl: { [key: string]: Podcast } = {
  "https://feeds.megaphone.fm/WWO8086402096": {
    title: "The Ben Shapiro Show",
    publisher: "The Daily Wire",
    artworkUrl:
      "https://images.megaphone.fm/_IaIovXFJT1vbHkbxi3QmrIR4mASd3rp156Qb26WJ2c/plain/s3://megaphone-prod/podcasts/35b42868-5c97-11ea-b0cc-039c766dfa49/image/avatars-000703722727-g9mf5u-original.jpg",
    description:
      "Tired of the lies? Tired of the spin? Are you ready to hear the hard-hitting truth in comprehensive, conservative, principled fashion? The Ben Shapiro Show brings you all the news you need to know in the most fast moving daily program in America. Ben brutally breaks down the culture and never gives an inch! Monday thru Friday.",
    episodes: [
      {
        title: "Supreme Court Apocalypse",
        publishedOn: new Date(),
        description: "description",
        duration: 600,
        audioUrl: "",
      },
      {
        title: "Matthew Yglesias | The Ben Shapiro Show Sunday Special Ep. 99",
        publishedOn: new Date(),
        description: "description",
        duration: 600,
        audioUrl: "",
      },
    ],
  },
  "http://www.podcastone.com/podcast?categoryID2=1826": {
    title: "The Laura Ingraham Podcast",
    publisher: "PodcastOne",
    artworkUrl:
      "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/20/f5/05/20f505aa-4fa0-7616-903c-1b808127568e/mza_6085722710473268494.jpg/600x600bb.jpg",
    description:
      "You loved her hugely successful radio show and now you can join Laura Ingraham three days a week as she covers politics, pop culture and media bias. And don't worry--as always, she'll still bring you hard-hitting guests and take your calls.",
    episodes: [
      {
        title:
          "“It either ends with the Left destroying Trump, or it ends up with the Left being repudiated” -- Newt Gingrich reveals what’s at stake as the Dems’ ramp up their impeachment mania",
        publishedOn: new Date(),
        description: "description",
        duration: 600,
        audioUrl: "",
      },
      {
        title:
          "Dems bet the farm on impeachment as Americans and the markets scream “No!” Guests: Pat Buchanan and Peter Schweizer ",
        publishedOn: new Date(),
        description: "description",
        duration: 600,
        audioUrl: "",
      },
    ],
  },
  "https://feeds.simplecast.com/hEI_f9Dx": {
    title: "React Native Radio",
    publisher:
      "Jamon Holmgren, Harris Robin Kalash, Robin Heinze, Adhithi Ravichandran",
    artworkUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Podcasts124/v4/aa/9a/3c/aa9a3cc0-4b7d-e4a4-edf4-d95ccfb2da10/mza_6209480282442557231.jpg/600x600bb.jpg",
    description: "Exploring React Native Together",
    episodes: [],
  },
  "https://feeds.soundcloud.com/users/soundcloud:users:859563619/sounds.rss": {
    title: "The React Native Show Podcast",
    publisher: "Callstack",
    artworkUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/0d/6a/c8/0d6ac8fb-a8e8-8d76-899e-78848c89f9c9/mza_7869552778057441002.jpg/600x600bb.jpg",
    description:
      "In this series, we’ll be discussing the most intriguing and relevant aspects of React Native and its ecosystem. Powered by Callstack.",
    episodes: [],
  },
}

export default (rssFeedUrl: string): Podcast => {
  return podcastsKeyedByRssFeedUrl[rssFeedUrl]
}
