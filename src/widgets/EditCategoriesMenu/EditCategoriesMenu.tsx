import React, { FC, useMemo } from "react"
import styled from "styled-components"
import { FillCategoriesWithTransactions } from "@entities/Transaction/helpers/FillCategoriesWithTransactions.ts"
import { IConvertedTransaction, TransactionType } from "@entities/Transaction/types.ts"
import { Category } from "@widgets/CategoriesMenu/ui/Category.tsx"
import { BalanceGraph } from "@widgets/CategoriesMenu/ui/BalanceGraph.tsx"
import { useOnMenuSlide } from "@entities/DateSlider/model/useOnMenuSlide.tsx"
import { FilterTransByType } from "@entities/Transaction/helpers/FilterTransByType.ts"
import { useMenuType } from "@widgets/CategoriesMenu/model/useMenuType.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { ICategory } from "@entities/Category/type.ts"


interface props {
  categories: ICategory[]
}

export const EditCategoriesMenu: FC<props> = ({ categories }) => {


  return <CategoryLayout>

    {/*{menuType === "income" && incFilledCategories.map((categoryData, i) => (*/}
    {/*  <Category key={i} dateTo={dateTo} {...categoryData} />*/}
    {/*))}*/}
    {/*{menuType === "expense" && expFilledCategories.map((categoryData, i) => (*/}
    {/*  <Category key={i} dateTo={dateTo} {...categoryData} />*/}
    {/*))}*/}
  </CategoryLayout>
}
const CategoryLayout = styled.div<{
  $isHidden?: boolean
}>`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 15px;
  overflow-y: auto;
  background-color: var(--bg-1);
  display: ${({ $isHidden }) => $isHidden ? "none" : "grid"};
  grid-template-rows: min-content min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;


`
