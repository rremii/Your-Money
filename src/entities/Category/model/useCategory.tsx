import { useGetCategoriesQuery } from "@entities/Category/api/CategoriesApi.ts"
import { ICategory } from "@entities/Category/type.ts"

export const useCategory = (userId?: number) => {
  const { data: allCategories } = useGetCategoriesQuery(userId, {
    skip: !userId,
  })

  const getCategoryById = (id: number) => {
    return allCategories?.find((category) => category.id === id) as ICategory
  }

  return {
    allCategories: allCategories || [],
    getCategoryById,
  }
}