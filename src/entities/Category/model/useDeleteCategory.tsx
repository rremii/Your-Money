import { useDeleteCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useNotifyToast } from "@shared/GlobalModules/Toasts/model/useNotifyToast.tsx"
import { useLoadingToast } from "@shared/GlobalModules/Toasts"
import { useTranslation } from "react-i18next"

export const useDeleteCategory = () => {
  const [deleteCategory, { isError, error, isLoading }] =
    useDeleteCategoryMutation()


  const { t } = useTranslation()
  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, t("category", { context: "deleting" }))

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const DeleteCategory = async (categoryId: number) => {
    await deleteCategory(categoryId)
  }

  return { DeleteCategory, isLoading }
}
