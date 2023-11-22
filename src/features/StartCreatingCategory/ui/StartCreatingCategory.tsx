import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import { CategoryIcon } from "@shared/ui/CustomIcon/CategoryIcon.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"

interface props {
  categoryType: TransactionType
}

export const StartCreatingCategory: FC<props> = ({ categoryType }) => {


  return <CreatingCategoryLayout>
    <div className="icon">
      <img src={Categories} alt="create category" />
    </div>
  </CreatingCategoryLayout>
}
const CreatingCategoryLayout = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
  }
`