import styled from "styled-components"
import Account from "@shared/assets/LightTheme/accounts.png"
import React, { FC } from "react"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import { IConvertedTransaction, TransactionType } from "@entities/Transaction/types.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setEditCurrency, setEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import { openMenu, setEditCreateMenuType } from "@entities/Modals/model/ModalsSlice.ts"
import { Currency } from "@entities/Currency/types.ts"

type props = IConvertedTransaction

export const Transaction: FC<props> = (transaction) => {
  const { quantity, type, title, accountId, categoryId, convertedQuantity, id, date } = transaction
  const dispatch = useAppDispatch()

  // const curCurrencySign = useTypedSelector(state => state.SideBar.curCurrencySign)


  const { data: user } = GetMe.useQueryState()
  const { getAccountById } = useAccount(user?.id)
  const { getCategoryById } = useCategory(user?.id)
  const account = getAccountById(accountId)
  const category = getCategoryById(categoryId)


  const OnClick = () => {
    dispatch(setEditCreateMenuType("overview"))
    dispatch(openMenu("editCreateTransMenu"))


    dispatch(setEditTransaction({
      id: id,
      title: title,
      dateStr: date,
      type
    }))
    dispatch(setEditTransQuantity(quantity))
    dispatch(setCategory(category))
    if (account) {
      dispatch(setEditCurrency(account.currency))
      dispatch(setAccount(account))
    }
  }

  return <TransactionLayout onClick={OnClick} $type={type}>
    <div className="icon">
      <img src={CategoriesIcons.get(category && category.icon)} alt="transaction icon" />
    </div>
    <div className="info">
      <p className="category">{category && category.name}</p>
      <div className="account-info">
        <img src={Account} alt="account type" />
        <p>{account?.name}</p>
      </div>
      <p className="title">{title ? title : ""}</p>
    </div>
    <div className="quantity">
      {type === "income" ? "+" : "-"}{DefaultCurrencySigns.get(account?.currency || Currency.DefaultCurrency)} {quantity}
    </div>
  </TransactionLayout>
}
const TransactionLayout = styled.div<{
  $type?: TransactionType
}>`

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px;
  gap: 12px;
  min-height: 60px;
  background-color: var(--txt-1);
  box-shadow: 0px 2px 4px 0px var(--shadow-2);
  margin-bottom: 1px;

  .icon {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .info {
    flex: 1 1 auto;

    .title {
      color: var(--txt-12);
      font-family: Inter;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .category {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 3px;
    }

    .account-info {
      display: flex;
      gap: 5px;
      align-items: baseline;
      margin-bottom: 3px;

      img {
        width: 13px;
        height: 10px;
      }

      p {
        color: var(--txt-2);
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .quantity {

    align-self: flex-start;
    color: ${({ $type }) => $type === "expense" ? "var(--txt-8)" : "var(--txt-10)"};
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`