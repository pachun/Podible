import reducer from "../../src/Provider/reducer"

describe("The Reducer", () => {
  it("sets the currently playing track", () => {
    const resultingState = reducer(
      {},
      { type: "SET_TRACK", value: { hello: "world" } },
    )

    expect(resultingState).toEqual({ track: { hello: "world" } })
  })

  it("doesn't change state when given an unknown action", () => {
    const resultingState = reducer(
      {},
      // @ts-ignore
      { type: "UNKOWN_ACTION", value: { hello: "world" } },
    )

    expect(resultingState).toEqual({})
  })
})
