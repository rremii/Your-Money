import { useFetchCurrencyQuery } from "@entities/Currency/api/CurrencyApi.ts"

export const useCurrencyConverter = () => {
  const { data } = useFetchCurrencyQuery()

  const convertCurrency = (
    quantity: number,
    currencyFrom: string,
    currencyTo: string,
  ): number => {
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
  }

  return { convertCurrency }
}