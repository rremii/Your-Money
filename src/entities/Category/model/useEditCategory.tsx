import { useEditCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"

export const useEditCategory = () => {
  const { name, icon, color, type, id } = useTypedSelector(
    (state) => state.NewCategory,
  )

  const [editCategory, { isLoading, isError, isSuccess, error }] =
    useEditCategoryMutation()

  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Editing the category...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const EditCategory = useCallback(async () => {
    if (!id || !name) return
    return await editCategory({ name, id, icon, color, type })
  }, [name, icon, color, type, id])

  return { EditCategory, isPending: isLoading, isSuccess }
}
