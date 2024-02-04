import { useCreateCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useCallback, useEffect } from "react"
import { DefaultResponse, ErrorResponse } from "@entities/Auth/types.ts"
import { useToast } from "@shared/hooks/useToast.tsx"

//todo get rid of user id, remove it from api and receive from getUserHook
export const useCreateCategory = () => {

  const { name, userId, icon, color, type } = useTypedSelector(state => state.NewCategory)

  const [createCategory, { isLoading, isError, error, isSuccess }] = useCreateCategoryMutation()


  const { ShowToast } = useToast(2000)

  useEffect(() => {
    if (!isError) return

    const { message } = error as ErrorResponse

    ShowToast(message, "error")

  }, [isError])

  const CreateCategory = useCallback(async () => {
    if (!userId) return
    await createCategory({ name, userId, icon, color, type })
  }, [name, userId, icon, color, type])


  return { CreateCategory, isPending: isLoading, isSuccess }

}