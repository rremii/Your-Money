import { useEditCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { useToast } from "@shared/hooks/useToast.tsx"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useEditAccountMutation } from "@entities/Account/api/AccountsApi.ts"

export const useEditAccount = () => {
  const { name, icon, color, id } = useTypedSelector(
    (state) => state.NewAccount,
  )

  const [editAccount, { isLoading, isError, isSuccess, error }] =
    useEditAccountMutation()

  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")
  }, [isError])

  const EditAccount = useCallback(async () => {
    if (!id || !name) return
    return await editAccount({ name, id, icon, color })
  }, [name, icon, color, id])

  return { EditAccount, isPending: isLoading, isSuccess }
}
