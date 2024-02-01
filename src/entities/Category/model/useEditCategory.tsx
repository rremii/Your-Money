import { useEditCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { useToast } from "@shared/hooks/useToast.tsx"
import { ErrorResponse } from "@entities/Auth/types.ts"

export const useEditCategory = () => {

  const { name, icon, color, type, id } = useTypedSelector(state => state.NewCategory)

  const [editCategory, { isLoading, isError, isSuccess, error }] = useEditCategoryMutation()


  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")

  }, [isError])

  const EditCategory = useCallback(async () => {
    if (!id) return
    return await editCategory({ name, id, icon, color, type })
  }, [name, icon, color, type, id])


  return { EditCategory, isPending: isLoading, isSuccess }

}