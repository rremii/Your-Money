import React, { FC, useMemo } from "react"
import styled from "styled-components"
import { FillCategoriesWithTransactions } from "@entities/Transaction/helpers/FillCategoriesWithTransactions.ts"
import { ICategory, ITransaction } from "@entities/Transaction/types.ts"
import { Category } from "@widgets/CategoriesMenu/ui/Category.tsx"
import { BalanceGraph } from "@widgets/CategoriesMenu/ui/BalanceGraph.tsx"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { FilterTransByType } from "@entities/Transaction/helpers/FilterTransByType.ts"
import { useMenuType } from "@widgets/CategoriesMenu/model/useMenuType.tsx"
import { useGetCategoriesQuery } from "@entities/Category/api/CategoriesApi.ts"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe, UserApi } from "@entities/User/api/UserApi.ts"
import { FilterCategoriesByType } from "@entities/Transaction/helpers/FilterCategoriesByType.ts"


export const expCategories = [
  { name: "Family", color: "#A930FF" },
  { name: "Gifts", color: "#CF3648" },
  { name: "Groceries", color: "#32CFFF" },
  { name: "Health", color: "#46A33D" },
  { name: "Leisure", color: "#A33D6E" },
  { name: "Shopping", color: "#7B7475" },
  { name: "Restaurant", color: "#316CFF" },
  { name: "Transport", color: "#AF8A6D" }
] as ICategory[]

export const incCategories = [
  { name: "Salary", color: "green" }
] as ICategory[]

interface props {
  menuId: number
  dateGap: string
  transactions: ITransaction[]
}

export const CategoryMenu: FC<props> = React.memo(({ menuId, dateGap, transactions }) => {

  const { SwitchMenuType, menuType } = useMenuType()
  const { observeRef } = useOnMenuSlide(dateGap, menuId)

  const { incTransactions, expTransactions } = useMemo(() => FilterTransByType(transactions), [transactions])

  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)
  const { expCategories, incCategories } = useMemo(() => FilterCategoriesByType(allCategories), [allCategories])

  const expFilledCategories = useMemo(() => FillCategoriesWithTransactions(expCategories, expTransactions), [expTransactions])
  const incFilledCategories = useMemo(() => FillCategoriesWithTransactions(incCategories, incTransactions), [incTransactions])

  // debugger
  return <CategoryLayout ref={observeRef}>
    <BalanceGraph
      menuType={menuType}
      OnClick={SwitchMenuType}
      expTransactions={expTransactions}
      incTransactions={incTransactions}
      categories={menuType === "expense" ? expFilledCategories : incFilledCategories}
    />

    {menuType === "income" && incFilledCategories.map((categoryData, i) => (
      <Category key={i} {...categoryData} />
    ))}
    {menuType === "expense" && expFilledCategories.map((categoryData, i) => (
      <Category key={i} {...categoryData} />
    ))}
  </CategoryLayout>
})
const CategoryLayout = styled.div`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 15px;
  overflow-y: auto;
  background-color: var(--bg-1);
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;


`
