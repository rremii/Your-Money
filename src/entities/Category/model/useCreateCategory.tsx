import { useCreateCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback } from "react"

export const useCreateCategory = () => {

  const { name, userId, icon, color, type } = useTypedSelector(state => state.NewCategory)

  const [createCategory, { isLoading }] = useCreateCategoryMutation()


  //todo make validation and toasts
  const CreateCategory = useCallback(() => {
    if (!userId) return
    createCategory({ name, userId, icon, color, type })
  }, [name, userId, icon, color, type])


  return { CreateCategory, isPending: isLoading }

}