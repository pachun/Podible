const apiUrl = __DEV__
  ? `http://${process.env.REACT_NATIVE_API_URL}:3000`
  : `https://podible-web.herokuapp.com`

export default apiUrl
