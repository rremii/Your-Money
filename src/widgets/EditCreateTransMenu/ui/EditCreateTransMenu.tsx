import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { Calculator } from "@shared/ui/CalculatorBtns/Calculator.tsx"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { ResultQuantity } from "@widgets/EditCreateTransMenu/ui/ResultQuantity.tsx"
import { Notes } from "@widgets/EditCreateTransMenu/ui/NotesInput.tsx"
import { TransDate } from "@shared/ui/TransDate.tsx"
import { OptionsSection } from "@widgets/EditCreateTransMenu/ui/OptionsSection.tsx"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import {
  closeMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { EditCreateMenuType } from "@entities/UI/types.ts"
import { CreateTransaction } from "@features/CreateTransaction/ui/CreateTransaction.tsx"
import { EditTransaction } from "@features/EditTransaction/ui/EditTransaction.tsx"
import { OpenChooseAccountMenu } from "@features/OpenChooseAccountMenu/ui/OpenChooseAccountMenu.tsx"
import { OpenChooseCategoryMenu } from "@features/OpenChooseCategoryMenu/ui/OpenChooseCategoryMenu.tsx"

export const EditCreateTransMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.isOpen,
  )
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )
  const dateStr = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.dateStr,
  )
  const curAccId = useTypedSelector((state) => state.CurAccount.id)

  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  useEffect(() => {
    if (!allAccounts?.length) return
    const curAccount = curAccId
      ? allAccounts.find(({ id }) => id === curAccId)
      : allAccounts[0]

    if (!curAccount) return
    dispatch(setAccount(curAccount))
  }, [allAccounts])

  const CloseMenu = () => {
    dispatch(closeMenu("editCreateTransMenu"))
    dispatch(setEditCreateMenuType(menuType))
    dispatch(resetEditTransaction())
    dispatch(resetTransCalculator())
  }

  return (
    <>
      <Overlay
        onClick={CloseMenu}
        $isActive={isMenuOpen}
        $zIndex={5}
        $color={"rgba(0, 0, 0, 0.78)"}
      />

      <MenuLayout $menuType={menuType} $isActive={isMenuOpen}>
        <div className="category-account-info">
          <OpenChooseAccountMenu />
          <OpenChooseCategoryMenu />
        </div>

        <ResultQuantity />

        <Notes />

        {menuType !== "overview" && (
          <Calculator>
            {menuType === "create" ? (
              <CreateTransaction />
            ) : (
              <EditTransaction />
            )}
          </Calculator>
        )}
        <TransDate dateStr={dateStr} />
        {menuType === "overview" && <OptionsSection />}
      </MenuLayout>
    </>
  )
})
const MenuLayout = styled.div<{
  $isActive?: boolean
  $menuType?: EditCreateMenuType
}>`
  position: fixed;
  z-index: 50;
  width: 100%;
  bottom: 0;
  max-width: 370px;
  left: 50%;
  transform: translateX(-50%)
    ${({ $isActive }) => ($isActive ? "translateY(0)" : "translateY(120%)")};
  margin: 0 auto;
  height: ${({ $menuType }) =>
    $menuType === "overview" ? "325.8px" : "474px"};
  transition:
    transform 0.5s,
    height 0.3s;

  .category-account-info {
    display: flex;
  }
`
