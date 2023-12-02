import styled from "styled-components"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { useCallback, useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { Calculator } from "@features/Calculator/ui/Calculator.tsx"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { InfoCell } from "@shared/ui/InfoCell.tsx"
import { ResultQuantity } from "@widgets/EditCreateTransMenu/ui/ResultQuantity.tsx"
import { Notes } from "@widgets/EditCreateTransMenu/ui/NotesInput.tsx"
import { TransDate } from "@shared/ui/TransDate.tsx"
import { OptionsSection } from "@widgets/EditCreateTransMenu/ui/OptionsSection.tsx"
import { useCreateTransactionMutation, useEditTransactionMutation } from "@entities/Transaction/api/TransactionApi.ts"
import { resetEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { resetTransCalculator } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { closeMenu, openMenu, setEditCreateMenuType } from "@entities/UI/model/ModalsSlice.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { EditCreateMenuType } from "@entities/UI/types.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"

export const EditCreateTransMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isMenuOpen = useTypedSelector(state => state.UI.Modals.editCreateTransMenu.isOpen)
  const menuType = useTypedSelector(state => state.UI.Modals.editCreateTransMenu.menuType)
  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const type = useTypedSelector(state => state.EditCreateTransaction.Transaction.type)
  const transactionId = useTypedSelector(state => state.EditCreateTransaction.Transaction.id)
  const account = useTypedSelector(state => state.EditCreateTransaction.ChosenAccount)
  const title = useTypedSelector(state => state.EditCreateTransaction.Transaction.title)
  const quantity = useTypedSelector(state => state.EditCreateTransaction.Calculator.quantity)
  const dateStr = useTypedSelector(state => state.EditCreateTransaction.Transaction.dateStr)
  const category = useTypedSelector(state => state.EditCreateTransaction.ChosenCategory)
  const currency = useTypedSelector(state => state.EditCreateTransaction.Transaction.currency)


  const { convertCurrency } = useCurrencyConverter()
  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)


  useEffect(() => {
    if (!allAccounts?.length) return
    const curAccount = curAccId ? allAccounts.find(({ id }) => id === curAccId) : allAccounts[0]

    if (!curAccount) return
    dispatch(setAccount(curAccount))

  }, [allAccounts])


  const CloseMenu = () => {
    dispatch(closeMenu("editCreateTransMenu"))
    dispatch(setEditCreateMenuType(menuType))
    dispatch(resetEditTransaction())
    dispatch(resetTransCalculator())
  }

  const OpenChooseCategoryMenu = useCallback(() => {
    dispatch(openMenu("chooseCategoryMenu"))
    if (menuType === "overview")
      dispatch(setEditCreateMenuType("edit"))
  }, [menuType])

  const OpenChooseAccountMenu = useCallback(() => {
    dispatch(openMenu("chooseAccountMenu"))
    if (menuType === "overview")
      dispatch(setEditCreateMenuType("edit"))
  }, [menuType])

  const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation()
  const [editTransaction, { isLoading: isEditing }] = useEditTransactionMutation()


  const CreateTransaction = async () => {
    if (!user?.id || !account.id || !category.id || !quantity) return

    await createTransaction({
      type, title, accountId: account.id, categoryId: category.id, quantity: GetConvertedCurrency(), date: dateStr
    })

    CloseMenu()
  }
  const GetConvertedCurrency = (): number => {
    if (currency !== account.currency)
      return RoundDecimal(convertCurrency(quantity, currency, account.currency), 2)
    else
      return quantity
  }

  const EditTransaction = async () => {
    if (!transactionId || !account.id || !category.id || !quantity) return
    await editTransaction({
      id: transactionId,
      accountId: account.id,
      categoryId: category.id,
      type,
      title,
      quantity: GetConvertedCurrency(),
      date: dateStr
    })
    CloseMenu()
  }

  const OnSubmit = async () => {
    if (menuType === "create")
      await CreateTransaction()
    if (menuType === "edit")
      await EditTransaction()
  }

  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={5}
             $color={"rgba(0, 0, 0, 0.78)"} />

    <MenuLayout $menuType={menuType} $isActive={isMenuOpen}>
      <div className="category-account-info">
        <InfoCell OnClick={OpenChooseAccountMenu}
                  iconNode={
                    <CustomIcon boxSize="100%" iconSize={"50%"} icon={account.icon} boxColor="transparent"
                                color={account.color} />
                  }
                  color={account.color} content={account.name}
                  iconRadius={"5px"}
                  title={"From account"} />
        <InfoCell OnClick={OpenChooseCategoryMenu}
                  iconNode={
                    <CustomIcon boxSize="100%" iconSize={"50%"} icon={category.icon} boxColor="transparent"
                                color={category.color} />
                  }
                  color={category.color}
                  content={category.name}
                  iconRadius={"50%"}
                  title={"To category"} />
      </div>

      <ResultQuantity type={type} />

      <Notes content={title} />

      {menuType !== "overview" &&
        <Calculator isLoading={isEditing || isCreating} OnSubmit={OnSubmit} color={category.color} />}
      <TransDate dateStr={dateStr} />
      {menuType === "overview" && <OptionsSection color={category.color} />}
    </MenuLayout>
  </>
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
  transform: translateX(-50%) ${({ $isActive }) => $isActive ? "translateY(0)" : "translateY(120%)"};
  margin: 0 auto;
  height: ${({ $menuType }) => $menuType === "overview" ? "325.8px" : "474px"};
  transition: transform 0.5s, height 0.3s;

  .category-account-info {
    display: flex;
  }
`
