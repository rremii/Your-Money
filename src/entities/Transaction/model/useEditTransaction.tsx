import { useEditTransactionMutation } from "@entities/Transaction/api/TransactionApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { useGetConvertedTransCurrency } from "@entities/Transaction/model/useGetConvertedTransCurrency.tsx"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"

export const useEditTransaction = () => {
  const { type, title, dateStr, id } = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction,
  )
  const accountId = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenAccount.id,
  )
  const quantity = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator.quantity,
  )
  const categoryId = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.id,
  )

  const [editTransaction, { isLoading, isSuccess, isError, error }] =
    useEditTransactionMutation()
  useCloseTransMenu(isLoading, isSuccess)
  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Editing the transaction...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const { GetConvertedCurrency } = useGetConvertedTransCurrency()

  const EditTransaction = async () => {
    if (!id || !accountId || !categoryId || !quantity) return
    await editTransaction({
      id,
      accountId: accountId,
      categoryId: categoryId,
      type,
      title,
      quantity: GetConvertedCurrency(),
      date: dateStr,
    })
  }

  return { EditTransaction, isLoading, isSuccess }
}
