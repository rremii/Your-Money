import styled from "styled-components"
import { ICategory, TransactionType } from "@entities/Transaction/types.ts"
import { FC, useEffect } from "react"
import { Category } from "@widgets/ChooseCategoryMenu/ui/Category.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setAccount,
  setCategory,
  setChooseCategoryMenu,
  setChooseCategorySlideMenu, setEditMenu
} from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { setCurMenu } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"

interface props {
  categories: ICategory[]
}

export const CategorySliderMenu: FC<props> = ({ categories }) => {
  const dispatch = useAppDispatch()


  const SetCategory = ({ color, name, icon, id }: ICategory) => {
    dispatch(setCategory({
      categoryId: id,
      category: {
        name, icon, color
      }
    }))
    dispatch(setChooseCategorySlideMenu(false))
    dispatch(setEditMenu({ menuType: "create", isOpen: true }))
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