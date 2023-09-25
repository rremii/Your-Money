import styled from "styled-components"
import { ICategory, TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import { Category } from "@widgets/ChooseCategoryMenu/ui/Category.tsx"

interface props {
  categories: ICategory[]
}

export const CategorySliderMenu: FC<props> = ({ categories }) => {


  return <CategorySliderMenuLayout>
    {categories.map((category) => (
      <Category {...category} />
    ))}
  </CategorySliderMenuLayout>
}
const CategorySliderMenuLayout = styled.div`
  //height: 260px;
  flex: 0 0 100%;
  //padding: 0 20px;

  scroll-snap-stop: always;
  scroll-snap-align: center;
`