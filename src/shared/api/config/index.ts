import axios from "axios"

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {}
})
export const $apiDefault = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {}
})

$api.interceptors.request.use((config) => {
  if (config.headers !== null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`
  }
  return config
})
$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<{ accessToken: string }>(
          API_URL + "auth/refresh",
          { withCredentials: true }
        )
        localStorage.setItem("accessToken", response.data.accessToken)
        return await $api.request(originalRequest)
      } catch (e) {
        window.location.href = "/"
        localStorage.removeItem("accessToken")
      }
    }
    throw error
  }
)
