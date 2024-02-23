import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useEditAccountMutation } from "@entities/Account/api/AccountsApi.ts"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"

export const useEditAccount = () => {
  const { name, icon, color, id } = useTypedSelector(
    (state) => state.NewAccount,
  )

  const [editAccount, { isLoading, isError, isSuccess, error }] =
    useEditAccountMutation()

  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Editing the account...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const EditAccount = useCallback(async () => {
    if (!id || !name) return
    return await editAccount({ name, id, icon, color })
  }, [name, icon, color, id])

  return { EditAccount, isPending: isLoading, isSuccess }
}
