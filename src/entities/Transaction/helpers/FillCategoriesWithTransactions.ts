import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { ICategory } from "@entities/Category/type.ts"

export const FillCategoriesWithTransactions = (
  categories: ICategory[],
  transactions: IConvertedTransaction[],
) => {
  return categories?.map((categoryData) => {
    const categoryQuantity = transactions
      .filter(({ categoryId }) => categoryId === categoryData.id)
      .reduce((accum, cur) => accum + cur.convertedQuantity, 0)
    return {
      ...categoryData,
      quantity: categoryQuantity,
    }
  })
}