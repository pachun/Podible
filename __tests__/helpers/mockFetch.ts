const mockFetch = (mockedUrl: string, mockedResponse: any) =>
  // @ts-ignore
  (global.fetch = (url: string) => {
    if (url === mockedUrl) {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse),
      })
    }
    return Promise.resolve({ json: () => Promise.resolve({}) })
  })

export default mockFetch
