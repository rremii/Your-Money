import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useToast } from "@shared/hooks/useToast.tsx"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useDeleteAccountMutation } from "@entities/Account/api/AccountsApi.ts"

export const useDeleteAccount = () => {
  const [deleteAccount, { isError, error }] = useDeleteAccountMutation()

  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")
  }, [isError])

  const DeleteAccount = async (AccountId: number) => {
    await deleteAccount(AccountId)
  }

  return { DeleteAccount }
}