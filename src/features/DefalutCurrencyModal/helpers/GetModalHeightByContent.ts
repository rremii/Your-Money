import { CurrencyMenuType } from "@features/DefalutCurrencyModal/types.ts"
import { Currency } from "@entities/Currency/types.ts"
import { CurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"

export const GetModalHeightByContent = (menuType: CurrencyMenuType, currency: Currency) => {

  if (menuType === "currency") {
    const staticElementsHeight = 150

    return staticElementsHeight + 350
  }
  if (menuType === "currencySign") {
    const staticElementsHeight = 115
    const amountOfElements = CurrencySigns[currency].length

    return staticElementsHeight + amountOfElements * 39
  }
}