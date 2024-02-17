import { useCreateCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"
import { useToast } from "@shared/GlobalModules/Toasts/model/useToast.tsx"
import { useLoadingToast, useNotifyToast } from "@shared/GlobalModules/Toasts"

export const useCreateCategory = (userId?: number) => {
  const { name, icon, color, type } = useTypedSelector(
    (state) => state.NewCategory,
  )

  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateCategoryMutation()

  const { ShowToast } = useNotifyToast(2000)
  useLoadingToast(isLoading, "Creating a category...")

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast({ message, state: "error" })
  }, [isError])

  const CreateCategory = useCallback(async () => {
    if (!userId || !name) return
    await createCategory({ name, userId, icon, color, type })
  }, [name, userId, icon, color, type])

  return { CreateCategory, isPending: isLoading, isSuccess }
}
