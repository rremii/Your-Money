import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"

export const useDeleteCategory = () => {


  const [deleteCategory] = useDeleteCategoryMutation()

  const DeleteCategory = async (categoryId: number) => {
    try {

      await deleteCategory(categoryId)

    } catch (e) {
      console.log(e)
    }
  }


  return { DeleteCategory }


}