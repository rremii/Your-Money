import React, { FC } from "react"
import styled from "styled-components"
import { ICategory } from "@entities/Category/type.ts"
import { Category } from "@widgets/EditCategoriesMenu/ui/Category.tsx"
import { TransactionType } from "@entities/Transaction/types.ts"
import { StartCreatingCategory } from "@features/StartCreatingCategory/ui/StartCreatingCategory.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditCategoryMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { setEditCategory } from "@entities/Category/model/NewCategorySlice.ts"

interface props {
  categories: ICategory[]
  categoryType: TransactionType
}

export const EditCategoriesMenu: FC<props> = ({ categories, categoryType }) => {
  const dispatch = useAppDispatch()

  const EditCategory = (initCategory: ICategory) => {
    dispatch(setEditCategory(initCategory))
    dispatch(openMenu("editCreateCategoryMenu"))
    dispatch(setEditCategoryMenuType("edit"))
  }

  return (
    <CategoryLayout>
      {categories.map((category) => (
        <Category key={category.id} OnClick={EditCategory} {...category} />
      ))}

      <StartCreatingCategory categoryType={categoryType} />
    </CategoryLayout>
  )
}
const CategoryLayout = styled.section<{
  $isHidden?: boolean
}>`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 25px;
  overflow-y: auto;
  background-color: var(--sub-bg);
  display: ${({ $isHidden }) => ($isHidden ? "none" : "grid")};
  grid-auto-rows: min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;

  justify-items: center;
  align-items: flex-end;
`
