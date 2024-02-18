import { useDeleteTransactionMutation } from "@entities/Transaction/api/TransactionApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCloseTransMenu } from "@entities/Transaction/model/useCloseTransMenu.tsx"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"

export const useDeleteTransaction = () => {
  const transId = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.id,
  )

  const [deleteTrans, { isLoading, isSuccess, isError, error }] =
    useDeleteTransactionMutation()

  useCloseTransMenu(isLoading, isSuccess)
  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Deleting the transaction...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const DeleteTransaction = async () => {
    if (transId) await deleteTrans(transId)
  }

  return { DeleteTransaction, isLoading }
}
