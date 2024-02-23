import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useGetConvertedTransCurrency = () => {
  const currency = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.currency,
  )
  const account = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenAccount,
  )
  const quantity = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator.quantity,
  )

  const { convertCurrency } = useCurrencyConverter()
  const GetConvertedCurrency = (): number => {
    if (currency !== account.currency)
      return RoundDecimal(
        convertCurrency(quantity, currency, account.currency),
        2,
      )
    else return quantity
  }

  return { GetConvertedCurrency }
}
