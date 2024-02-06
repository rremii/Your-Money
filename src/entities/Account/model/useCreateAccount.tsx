import { useCreateCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { DefaultResponse, ErrorResponse } from "@entities/Auth/types.ts"
import { useToast } from "@shared/hooks/useToast.tsx"
import { useCreateAccountMutation } from "@entities/Account/api/AccountsApi.ts"

export const useCreateAccount = (userId?: number) => {
  const { name, icon, color, currency } = useTypedSelector(
    (state) => state.NewAccount,
  )

  const [createAccount, { isLoading, isError, error, isSuccess }] =
    useCreateAccountMutation()

  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")
  }, [isError])

  const CreateAccount = useCallback(async () => {
    if (!userId || !name) return
    await createAccount({ name, userId, icon, color, currency })
  }, [name, userId, icon, color, currency])

  return { CreateAccount, isPending: isLoading, isSuccess }
}
