import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useCreateAccountMutation } from "@entities/Account/api/AccountsApi.ts"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"

export const useCreateAccount = (userId?: number) => {
  const { name, icon, color, currency } = useTypedSelector(
    (state) => state.NewAccount,
  )

  const [createAccount, { isLoading, isError, error, isSuccess }] =
    useCreateAccountMutation()

  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Creating an account...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const CreateAccount = useCallback(async () => {
    if (!userId || !name) return
    await createAccount({ name, userId, icon, color, currency })
  }, [name, userId, icon, color, currency])

  return { CreateAccount, isPending: isLoading, isSuccess }
}
