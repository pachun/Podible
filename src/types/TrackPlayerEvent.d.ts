interface TrackPlayerEvent {
  type: string
  state?:
    | "playing"
    | "paused"
    | "idle"
    | "ready"
    | "buffering"
    | "loading"
    | "unstarted"
  permanent?: string
  paused?: string
}
