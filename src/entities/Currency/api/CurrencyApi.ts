// import axios from "axios"
//
// export class CurrencyApi {
//
//   async fetchCurrency() {
//     return await axios.get<fetchCurrencyResponse>("https://www.cbr-xml-daily.ru/latest.js")
//
//   }
//
// }
//
//
// export const currencyApi = new CurrencyApi()


import { Api } from "@shared/api/config/Api.ts"
import { ICategory } from "@entities/Category/type.ts"
import { fetchCurrencyResponse } from "@entities/Currency/types.ts"

export const CurrencyApi = Api.injectEndpoints({

  endpoints: (build) => ({

    fetchCurrency: build.query<fetchCurrencyResponse, void>({
      query: () => ({
        url: "latest.js",
        method: "GET",
        baseUrl: "https://www.cbr-xml-daily.ru/",
        withInterceptors: false,
        withCredentials: false
      })

    })


  }),
  overrideExisting: false
})

export const {
  useFetchCurrencyQuery
} = CurrencyApi