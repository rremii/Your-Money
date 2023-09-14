import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { useEffect } from "react"
import { InfoCell } from "@widgets/CurTransMenu/ui/InfoCell.tsx"
import { ResultQuantity } from "@widgets/CurTransMenu/ui/ResultQuantity.tsx"
import { Notes } from "@widgets/CurTransMenu/ui/NotesInput.tsx"
import { TransDate } from "@widgets/CurTransMenu/ui/TransDate.tsx"
import { OptionsSection } from "@widgets/CurTransMenu/ui/OptionsSection.tsx"
import { Calculator } from "@widgets/CurTransMenu/ui/Calculator.tsx"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setAccount,
  setChooseAccountMenu,
  setChooseCategoryMenu,
  setEditMenu
} from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import { AccountsIcons } from "@shared/constants/AccountsIcons.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { setCurAccount } from "@entities/Account/model/CurAccountSlice.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"

export const CurTransMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(state => state.CurTransaction.isEditMenu)
  const menuType = useTypedSelector(state => state.CurTransaction.editMenuType)

  const curAccId = useTypedSelector(state => state.CurAccount.id)

  const type = useTypedSelector(state => state.CurTransaction.type)
  const account = useTypedSelector(state => state.CurTransaction.account)
  const quantity = useTypedSelector(state => state.CurTransaction.quantity)
  const title = useTypedSelector(state => state.CurTransaction.title)
  const dateStr = useTypedSelector(state => state.CurTransaction.dateStr)
  const category = useTypedSelector(state => state.CurTransaction.category)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  useEffect(() => {
    if (!allAccounts?.length) return
    const curAccount = curAccId ? allAccounts.find(({ id }) => id === curAccId) : allAccounts[0]

    if (!curAccount) return
    dispatch(setAccount({
      accountId: curAccount.id,
      account: curAccount
    }))
  }, [allAccounts])

  const CloseMenu = () => {
    dispatch(setEditMenu({
      isOpen: false,
      menuType
    }))
  }

  const OpenChooseCategoryMenu = () => {
    dispatch(setChooseCategoryMenu(true))
  }
  const OpenChooseAccountMenu = () => {
    dispatch(setChooseAccountMenu(true))
  }
  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />

    <MenuLayout $isActive={isMenuOpen}>
      <div className="category-account-info">
        <InfoCell OnClick={OpenChooseAccountMenu}
                  icon={AccountsIcons.get(account.icon)}
                  color={account.color} content={account.name}
                  iconRadius={"5px"}
                  title={"From account"} />
        <InfoCell OnClick={OpenChooseCategoryMenu}
                  icon={CategoriesIcons.get(category.icon)}
                  color={category.color}
                  content={category.name}
                  iconRadius={"50%"}
                  title={"To category"} />
      </div>

      <ResultQuantity color={category.color} type={type} quantity={quantity} />

      <Notes content={title} />

      {menuType !== "overview" && <Calculator color={category.color} />}
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
