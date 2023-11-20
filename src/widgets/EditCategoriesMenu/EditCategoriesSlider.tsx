import styled from "styled-components"
import React, { memo, useMemo } from "react"
import { useSlider } from "@entities/DateSlider/model/useSlider.tsx"
import { useGetTransactions } from "@entities/Transaction/model/useGetTransactions.tsx"
import { GetTransByMenus } from "@entities/Transaction/model/GetTransByMenus.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { CategoryMenu } from "@widgets/CategoriesMenu/ui/CategoryMenu.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { SliderLayout } from "@shared/ui/Slider.tsx"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { EditCategoriesMenu } from "@widgets/EditCategoriesMenu/EditCategoriesMenu.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { FilterCategoriesByType } from "@entities/Category/model/FilterCategoriesByType.ts"


export const EditCategoriesSlider = memo(() => {

  const isEditMode = useTypedSelector(state => state.UI.Pages.categoryPage.isCategoriesEditMode)

  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)
  const { expCategories, incCategories } = useMemo(() => FilterCategoriesByType(allCategories), [allCategories])


  return <CategoriesLayout $isHidden={!isEditMode}>

    <EditCategoriesMenu categories={expCategories} />
    <EditCategoriesMenu categories={incCategories} />

  </CategoriesLayout>
})
const CategoriesLayout = styled(SliderLayout)<{
  $isHidden?: boolean
}>`
  position: absolute;

  pointer-events: ${({ $isHidden }) => $isHidden ? "none" : "initial"};
  opacity: ${({ $isHidden }) => $isHidden ? 0 : 1};
  transition: opacity 0.4s;


  height: calc(100vh - 55px - 95px); // - footer - header
  top: 95px;
  background-color: var(--bg-1);

  z-index: 1;
`

