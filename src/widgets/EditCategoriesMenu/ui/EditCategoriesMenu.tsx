import React, { FC } from "react"
import styled from "styled-components"
import { ICategory } from "@entities/Category/type.ts"
import { Category } from "@widgets/EditCategoriesMenu/ui/Category.tsx"
import { TransactionType } from "@entities/Transaction/types.ts"
import { StartCreatingCategory } from "@features/StartCreatingCategory/ui/StartCreatingCategory.tsx"


interface props {
  categories: ICategory[]
  categoryType: TransactionType
}

export const EditCategoriesMenu: FC<props> = ({ categories, categoryType }) => {


  return <CategoryLayout>

    {categories.map((category) => (
      <Category {...category} />
    ))}

    <StartCreatingCategory categoryType={categoryType} />

  </CategoryLayout>
}
const CategoryLayout = styled.div<{
  $isHidden?: boolean
}>`
  scroll-snap-stop: always;
  scroll-snap-align: center;
  padding: 40px 15px 25px;
  overflow-y: auto;
  background-color: var(--bg-1);
  display: ${({ $isHidden }) => $isHidden ? "none" : "grid"};
  grid-auto-rows: min-content;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  height: 100%;
  width: max-content;
  flex: 0 0 100%;

  justify-items: center;
  align-items: flex-end;


`
