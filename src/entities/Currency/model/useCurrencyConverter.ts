import { useFetchCurrencyQuery } from "@entities/Currency/api/CurrencyApi.ts"
import { useCallback } from "react"

export const useCurrencyConverter = () => {
  const { data } = useFetchCurrencyQuery()

  const convertCurrency = useCallback(
    (quantity: number, currencyFrom: string, currencyTo: string): number => {
      if (!data) return 0
      const { base, rates } = data

      if (currencyFrom.toUpperCase() === base.toUpperCase()) {
        const toRate = rates[currencyTo.toUpperCase()]
        return quantity * toRate
      }
      if (currencyTo.toUpperCase() === base.toUpperCase()) {
        const toRate = rates[currencyFrom.toUpperCase()]
        return quantity * (1 / toRate)
      }

      const toRate = rates[currencyTo.toUpperCase()]
      const fromRate = rates[currencyFrom.toUpperCase()]
      const factor = toRate / fromRate

      return quantity * factor
    },
    [data],
  )

  return { convertCurrency }
}
