interface TrackPlayerEvent {
  type: string
  state?:
    | "playing"
    | "paused"
    | "idle"
    | "ready"
    | "unknown"
    | "buffering"
    | "loading"
  permanent?: string
  paused?: string
}
