import styled from "styled-components"
import { FC, useCallback } from "react"
import { Category } from "@widgets/ChooseCategoryMenu/ui/Category.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setChooseCategorySlideMenu } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"
import { setEditCreateMenuType, setEditCreateTransMenu } from "@entities/Modals/model/EditCreateTransMenuSlice.ts"
import { setEditTransType } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { ICategory } from "@entities/Category/type.ts"


interface props {
  categories: ICategory[]
}

export const CategorySliderMenu: FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch()


  const SetCategory = useCallback((category: ICategory) => {
    dispatch(setCategory(category))
    dispatch(setEditTransType(category.type))
    dispatch(setChooseCategorySlideMenu(false))

    dispatch(setEditCreateMenuType("create"))
    dispatch(setEditCreateTransMenu(true))
  }, [])

  return <CategorySliderMenuLayout>
    {categories.map((category) => (
      <Category key={category.id} OnClick={SetCategory} {...category} />
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