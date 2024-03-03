import styled from "styled-components"
import { FC, useCallback } from "react"
import { Category } from "@shared/ui/Category.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setEditTransType } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { ICategory } from "@entities/Category/type.ts"
import {
  closeMenu,
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"

interface props {
  categories: ICategory[]
}

export const CategorySliderMenu: FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch()

  const SetCategory = useCallback((category: ICategory) => {
    dispatch(setCategory(category))
    dispatch(setEditTransType(category.type))
    dispatch(closeMenu("chooseCategorySlideMenu"))

    dispatch(setEditCreateMenuType("create"))
    dispatch(openMenu("editCreateTransMenu"))
  }, [])

  return (
    <CategorySliderMenuLayout>
      {categories.map((category) => (
        <Category key={category.id} OnClick={SetCategory} {...category} />
      ))}
    </CategorySliderMenuLayout>
  )
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
