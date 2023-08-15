import { ICategory, ITransaction } from "@entities/Transaction/types.ts"

export const FillCategoriesWithTransactions = (categories: ICategory[], transactions: ITransaction[]) => {
  return categories.map(({ name, color }) => {
    const categoryQuantity = transactions
      .filter(({ category }) => category === name)
      .reduce((accum, cur) => accum + cur.quantity, 0)
    return {
      name, color, quantity: categoryQuantity
    }
  })
}