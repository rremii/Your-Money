import { ICategory, ITransaction } from "@entities/Transaction/types.ts"

export const FilterCategoriesByType = (categories?: ICategory[]) => {

  const expCategories: ITransaction[] = []
  const incCategories: ITransaction[] = []

  categories?.forEach((category) => {
    if (category.type === "expense") expCategories.push(category)
    if (category.type === "income") incCategories.push(category)
  })

  return {
    expCategories, incCategories
  }
}