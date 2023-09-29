import styled from "styled-components"
import { ICategory } from "@entities/Transaction/types.ts"
import { FC } from "react"
import { Category } from "@widgets/ChooseCategoryMenu/ui/Category.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setChooseCategorySlideMenu } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"
import { setEditCreateMenuType, setEditCreateTransMenu } from "@entities/Modals/model/EditCreateTransMenuSlice.ts"


interface props {
  categories: ICategory[]
}

export const CategorySliderMenu: FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch()


  const SetCategory = (category: ICategory) => {
    dispatch(setCategory(category))
    dispatch(setChooseCategorySlideMenu(false))

    dispatch(setEditCreateMenuType("create"))
    dispatch(setEditCreateTransMenu(true))
  }

  return <CategorySliderMenuLayout>
    {categories.map((category) => (
      <Category OnClick={SetCategory} {...category} />
    ))}
  </CategorySliderMenuLayout>
}
const CategorySliderMenuLayout = styled.div`
  //height: 260px;
  flex: 0 0 100%;
  //padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  scroll-snap-stop: always;
  scroll-snap-align: center;

  .Category {
    .icon {
      opacity: 1;
    }
  }
`