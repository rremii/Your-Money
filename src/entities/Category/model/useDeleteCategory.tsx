import { useDeleteCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useToast } from "@shared/hooks/useToast.tsx"
import { useEffect } from "react"
import { ErrorResponse } from "@entities/Auth/types.ts"

export const useDeleteCategory = () => {
  const [deleteCategory, { isError, error, isLoading }] =
    useDeleteCategoryMutation()

  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")
  }, [isError])

  const DeleteCategory = async (categoryId: number) => {
    await deleteCategory(categoryId)
  }

  return { DeleteCategory, isLoading }
}
