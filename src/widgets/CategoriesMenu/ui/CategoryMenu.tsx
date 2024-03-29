import React, { FC, useMemo } from "react"
import styled from "styled-components"
import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { Category } from "@widgets/CategoriesMenu/ui/Category.tsx"
import { BalanceGraph } from "@widgets/CategoriesMenu/ui/BalanceGraph.tsx"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { FilterTransByType } from "@entities/Transaction/helpers/FilterTransByType.ts"
import { useMenuType } from "@widgets/CategoriesMenu/model/useMenuType.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"
import { FillCategoriesWithTransactions } from "@entities/Transaction"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { LoginRequiredMenu } from "@shared/ui/LoginRequiredMenu.tsx"

interface props {
  menuId: number
  dateGap: string
  transactions: IConvertedTransaction[]
  dateTo: Date
  dateFrom: Date
}

export const CategoryMenu: FC<props> = React.memo(
  ({ menuId, dateGap, transactions, dateTo, dateFrom }) => {
    const loginState = useTypedSelector((state) => state.Auth.isLoggedIn)

    const { SwitchMenuType, menuType } = useMenuType()
    const { observeRef } = useOnMenuSlide(dateGap, menuId, dateFrom)

    const { incTransactions, expTransactions } = useMemo(
      () => FilterTransByType(transactions),
      [transactions],
    )

    const { data: user } = GetMe.useQueryState()
    const { allCategories } = useCategory(user?.id)
    const { expCategories, incCategories } = useMemo(
      () => FilterCategoriesByType(allCategories),
      [allCategories],
    )

    const expFilledCategories = useMemo(
      () => FillCategoriesWithTransactions(expCategories, expTransactions),
      [expCategories, expTransactions],
    )
    const incFilledCategories = useMemo(
      () => FillCategoriesWithTransactions(incCategories, incTransactions),
      [incCategories, incTransactions],
    )
    if (loginState !== "success")
      return <LoginRequiredMenu nodeRef={observeRef} />
    return (
      <CategoryLayout ref={observeRef}>
        <BalanceGraph
          menuType={menuType}
          OnClick={SwitchMenuType}
          expTransactions={expTransactions}
          incTransactions={incTransactions}
          categories={
            menuType === "expense" ? expFilledCategories : incFilledCategories
          }
        />

        {menuType === "income" &&
          incFilledCategories.map((categoryData, i) => (
            <Category key={i} dateTo={dateTo} {...categoryData} />
          ))}
        {menuType === "expense" &&
          expFilledCategories.map((categoryData, i) => (
            <Category key={i} dateTo={dateTo} {...categoryData} />
          ))}
      </CategoryLayout>
    )
  },
)
const CategoryLayout = styled.section`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 15px;
  overflow-y: auto;
  background-color: var(--sub-bg);
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;
`
