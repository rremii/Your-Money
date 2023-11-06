import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { $api, $apiDefault, API_URL } from "./index"
import { AxiosError, AxiosRequestConfig } from "axios"
import { ApiError } from "@shared/api/config/types"

const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig["method"]
    data?: AxiosRequestConfig["data"]
    params?: AxiosRequestConfig["params"]
    withInterceptors?: boolean //use default axios, instead of custom with interceptors
    baseUrl?: string,
    withCredentials?: boolean
  },
  unknown,
  ApiError
> =>
  async ({ url, method, data, params, withCredentials, withInterceptors = true, baseUrl = API_URL }) => {
    try {
      let result
      if (withInterceptors) {

        result = await $api({ url: baseUrl + url, method, data, params, withCredentials })
      } else
        result = await $apiDefault({ url: baseUrl + url, method, data, params, withCredentials })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError<ApiError>
      return {
        error: err.response?.data
      }
    }
  }

export const Api = createApi({
  reducerPath: "ApiRtk",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [
    "User", "Categories", "Accounts", "Transactions", "HistoryPoints"
  ]
})
