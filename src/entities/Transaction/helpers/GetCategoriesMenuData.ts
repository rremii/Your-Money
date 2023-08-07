import { ITransaction } from "@entities/Transaction/model/useGetTransactions.tsx"
import { ICategory } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"

export const GetCategoriesMenuData = (categories: ICategory[], transactions: ITransaction[]) => {
  return categories.map(({ name, img }) => {
    const categoryQuantity = transactions
      .filter(({ category }) => category === name)
      .reduce((accum, cur) => accum + cur.quantity, 0)
    return {
      name, img, quantity: categoryQuantity
    }
  })
}