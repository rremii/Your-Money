import { useGetCategoriesQuery } from "@entities/Category/api/CategoriesApi.ts"

//todo
export const useCategory = (userId?: number) => {

  const { data: allCategories } = useGetCategoriesQuery(userId, {
    skip: !userId
  })


  return {
    allCategories
  }

}