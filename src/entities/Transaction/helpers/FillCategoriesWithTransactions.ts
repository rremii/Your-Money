import { ITransaction } from "@entities/Transaction/types.ts"
import { ICategory } from "@entities/Category/type.ts"

export const FillCategoriesWithTransactions = (categories: ICategory[], transactions: ITransaction[]) => {

  return categories?.map((categoryData) => {
    const categoryQuantity = transactions
      .filter(({ categoryId }) => categoryId === categoryData.id)
      .reduce((accum, cur) => accum + cur.quantity, 0)
    return {
      ...categoryData, quantity: categoryQuantity
    }
  })

}