import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useDeleteAccountMutation } from "@entities/Account/api/AccountsApi.ts"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useTranslation } from "react-i18next"

export const useDeleteAccount = () => {
  const [deleteAccount, { isError, error, isLoading }] =
    useDeleteAccountMutation()

  const { t } = useTranslation()
  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, t("account", { context: "deleting" }))

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const DeleteAccount = async (AccountId: number) => {
    await deleteAccount(AccountId)
  }

  return { DeleteAccount, isLoading }
}
