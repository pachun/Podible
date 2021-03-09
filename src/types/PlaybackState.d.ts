// type PlaybackState =
//   | "playing"
//   | "paused"
//   | "idle"
//   | "ready"
//   | "unknown"
//   | "buffering"
//   | "loading"

type PlaybackState =
  | { name: "playing" }
  | { name: "paused" }
  | { name: "idle" }
  | { name: "ready" }
  | { name: "unknown" }
  | { name: "buffering" }
  | { name: "loading" }
