const mockFetch = (mockedUrl: string, mockedResponse: any) =>
  // @ts-ignore
  (global.fetch = async (url: string) => {
    if (url === mockedUrl) {
      return await {
        text: async () => await mockedResponse,
        json: async () => await mockedResponse,
      }
    }
    return await { json: async () => await {} }
  })

export default mockFetch
