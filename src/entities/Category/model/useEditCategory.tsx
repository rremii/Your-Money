import { useEditCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback } from "react"

export const useEditCategory = () => {

  const { name, icon, color, type, id } = useTypedSelector(state => state.NewCategory)

  const [editCategory, { isLoading }] = useEditCategoryMutation()


  //todo make validation and toasts
  const EditCategory = useCallback(() => {
    if (!id) return
    editCategory({ name, id, icon, color, type })
  }, [name, icon, color, type, id])


  return { EditCategory, isPending: isLoading }

}