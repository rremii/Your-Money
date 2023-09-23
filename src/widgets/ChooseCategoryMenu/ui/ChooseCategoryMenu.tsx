import React from "react"
import styled from "styled-components"
import { ChooseMenuHeader } from "@shared/ui/ChooseMenuHeader.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { Category } from "@widgets/ChooseCategoryMenu/ui/Category.tsx"
import { ChooseMenuLayout } from "@shared/ui/ChooseMenuLayout.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setChooseCategoryMenu } from "@entities/CurTransaction/model/CurTransactionSlice.ts"

export const ChooseCategoryMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const { data: user } = GetMe.useQueryState()
  const { allCategories } = useCategory(user?.id)

  const isOpen = useTypedSelector(state => state.CurTransaction.isChooseCategoryMenu)
  const type = useTypedSelector(state => state.CurTransaction.type)
  const chosenCategoryName = useTypedSelector(state => state.CurTransaction.category.name)

  const CloseMenu = () => {
    dispatch(setChooseCategoryMenu(false))
  }

  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />

    <ChooseMenuLayout $isActive={isOpen}>
      <ChooseMenuHeader content={type} />
      <CategoriesBox>
        {allCategories?.filter((category) => category.type === type)
          .map((category, index) => {
            return <Category key={index} {...category} isActive={chosenCategoryName === category.name} />
          })}
      </CategoriesBox>
    </ChooseMenuLayout>
  </>
})

const CategoriesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  gap: 3px;
  justify-content: center;
  max-height: 522px;
  height: min-content;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`