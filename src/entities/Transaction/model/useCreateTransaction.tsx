import {
  useCreateTransactionMutation,
  useEditTransactionMutation,
} from "@entities/Transaction/api/TransactionApi.ts"
import {
  closeMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useGetConvertedTransCurrency } from "@entities/Transaction/model/useGetConvertedTransCurrency.tsx"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"

export const useCreateTransaction = () => {
  const { type, title, dateStr } = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction,
  )
  const accountId = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenAccount.id,
  )
  const categoryId = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory.id,
  )
  const quantity = useTypedSelector(
    (state) => state.EditCreateTransaction.Calculator.quantity,
  )
  const { data: user } = GetMe.useQueryState()

  const [createTransaction, { isLoading, isSuccess, isError, error }] =
    useCreateTransactionMutation()

  useCloseTransMenu(isLoading, isSuccess)
  const { GetConvertedCurrency } = useGetConvertedTransCurrency()
  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Creating a transaction...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const CreateTransaction = async () => {
    if (!user?.id || !accountId || !categoryId || !quantity) return

    await createTransaction({
      type,
      title,
      accountId: accountId,
      categoryId: categoryId,
      quantity: GetConvertedCurrency(),
      date: dateStr,
    })
  }

  return { CreateTransaction, isLoading, isSuccess }
}
