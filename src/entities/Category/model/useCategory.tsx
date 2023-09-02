import { useEffect, useMemo } from "react"
import { useGetCategoriesQuery } from "@entities/Category/api/CategoriesApi.ts"
import { FilterCategoriesByType } from "@entities/Transaction/helpers/FilterCategoriesByType.ts"

//todo
export const useCategory = (userId?: number) => {

  const { data: allCategories } = useGetCategoriesQuery(userId, {
    skip: !userId
  })


  return {
    allCategories
  }

}