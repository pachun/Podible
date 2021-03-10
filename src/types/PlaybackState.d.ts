type PlaybackState =
  | { name: "playing" }
  | { name: "paused" }
  | { name: "idle" }
  | { name: "ready" }
  | { name: "unknown" }
  | { name: "buffering" }
  | { name: "loading" }
