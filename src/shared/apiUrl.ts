import { AsyncStorage } from "react-native"

const apiUrl = __DEV__
  ? `http://${process.env.REACT_NATIVE_API_URL}:3000`
  : `https://podible.app`

const getApiToken = async (): Promise<string> => {
  const maybeApiToken = await AsyncStorage.getItem("api token")
  const apiToken = maybeApiToken
    ? maybeApiToken
    : await (async () => {
        const response = await fetch(`${apiUrl}/devices`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
        })
        return (await response.json()).api_token
      })()

  await AsyncStorage.setItem("api token", apiToken)
  return apiToken
}

export const apiRequestHeaders = async (): Promise<Record<string, string>> => {
  const apiToken = await getApiToken()

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  }
}

export default apiUrl
