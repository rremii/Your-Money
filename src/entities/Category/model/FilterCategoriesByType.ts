import { ICategory } from "@entities/Category/type.ts"

export const FilterCategoriesByType = (categories?: ICategory[]) => {
  const expCategories: ICategory[] = []
  const incCategories: ICategory[] = []

  categories?.forEach((category) => {
    if (category.type === "expense") expCategories.push(category)
    if (category.type === "income") incCategories.push(category)
  })

  return {
    expCategories,
    incCategories,
  }
}