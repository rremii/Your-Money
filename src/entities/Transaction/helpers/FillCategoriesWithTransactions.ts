import { ICategory, ITransaction } from "@entities/Transaction/types.ts"

export const FillCategoriesWithTransactions = (categories: ICategory[], transactions: ITransaction[]) => {

  return categories?.map((categoryData) => {
    const categoryQuantity = transactions
      .filter(({ category }) => category === categoryData.name)
      .reduce((accum, cur) => accum + cur.quantity, 0)
    return {
      ...categoryData, quantity: categoryQuantity
    }
  })

}