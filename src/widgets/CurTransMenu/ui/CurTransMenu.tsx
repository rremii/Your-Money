import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React from "react"
import { InfoCell } from "@widgets/CurTransMenu/ui/InfoCell.tsx"
import { ResultQuantity } from "@widgets/CurTransMenu/ui/ResultQuantity.tsx"
import { Notes } from "@widgets/CurTransMenu/ui/NotesInput.tsx"
import { TransDate } from "@widgets/CurTransMenu/ui/TransDate.tsx"
import { OptionsSection } from "@widgets/CurTransMenu/ui/OptionsSection.tsx"
import { Calculator } from "@widgets/CurTransMenu/ui/Calculator.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setEditMenu } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import { AccountsIcons } from "@shared/constants/AccountsIcons.ts"

export const CurTransMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(state => state.CurTransaction.isEditMenu)
  const menuType = useTypedSelector(state => state.CurTransaction.editMenuType)

  const type = useTypedSelector(state => state.CurTransaction.type)
  // const id = useTypedSelector(state => state.CurTransaction.id)
  // const accountId = useTypedSelector(state => state.CurTransaction.accountId)
  // const categoryId = useTypedSelector(state => state.CurTransaction.categoryId)
  const account = useTypedSelector(state => state.CurTransaction.account)
  const quantity = useTypedSelector(state => state.CurTransaction.quantity)
  const title = useTypedSelector(state => state.CurTransaction.title)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)
  const category = useTypedSelector(state => state.CurTransaction.category)


  const CloseMenu = () => {
    dispatch(setEditMenu({
      isOpen: false,
      menuType
    }))
  }

  console.log("qwe")

  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />

    <MenuLayout $isActive={isMenuOpen}>
      <div className="category-account-info">
        <InfoCell icon={AccountsIcons.get(account.icon)} color={account.color} content={account.name} iconRadius={"5px"}
                  title={"From account"} />
        <InfoCell icon={CategoriesIcons.get(category.icon)} color={category.color} content={category.name}
                  iconRadius={"50%"}
                  title={"To category"} />
      </div>
      <ResultQuantity color={category.color} type={type} quantity={quantity} />
      <Notes content={title} />
      {menuType === "edit" && <Calculator color={category.color} />}
      <TransDate dateStr={dateStr} />
      {menuType === "overview" && <OptionsSection color={category.color} />}
    </MenuLayout>
  </>
})
const MenuLayout = styled.div<{
  $isActive?: boolean
}>`
  position: fixed;
  z-index: 50;
  width: 100%;
  bottom: 0;
  max-width: 370px;
  left: 50%;
  transform: translateX(-50%) ${({ $isActive }) => $isActive ? "translateY(0)" : "translateY(120%)"};
  margin: 0 auto;
  transition: 0.5s;

  .category-account-info {
    display: flex;
  }
`
