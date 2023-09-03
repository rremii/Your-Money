import { useEffect, useMemo } from "react"
import { useGetCategoriesQuery } from "@entities/Category/api/CategoriesApi.ts"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"

//todo
export const useCategory = (userId?: number) => {

  const { data: allCategories } = useGetCategoriesQuery(userId, {
    skip: !userId
  })


  return {
    allCategories
  }

}