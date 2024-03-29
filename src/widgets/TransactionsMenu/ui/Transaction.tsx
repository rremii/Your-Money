import styled from "styled-components"
import Account from "../../../../public/icons/general/accounts.svg"
import React, { FC } from "react"
import {
  IConvertedTransaction,
  TransactionType
} from "@entities/Transaction/types.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setEditCurrency,
  setEditTransaction
} from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { useCategory } from "@entities/Category/model/useCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { DefaultCurrencySigns } from "@entities/Settings/constants/CurrencySigns.ts"
import {
  openMenu,
  setEditCreateMenuType
} from "@entities/UI/model/ModalsSlice.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

type props = IConvertedTransaction

export const Transaction: FC<props> = (transaction) => {
  const { quantity, type, title, accountId, categoryId, id, date } = transaction
  const dispatch = useAppDispatch()

  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat
  )

  const { data: user } = GetMe.useQueryState()
  const { getAccountById } = useAccount(user?.id)
  const { getCategoryById } = useCategory(user?.id)
  const account = getAccountById(accountId)
  const category = getCategoryById(categoryId)

  const OnClick = () => {
    dispatch(setEditCreateMenuType("overview"))
    dispatch(openMenu("editCreateTransMenu"))

    dispatch(
      setEditTransaction({
        id: id,
        title: title,
        dateStr: date,
        type
      })
    )
    dispatch(setEditTransQuantity(quantity))
    dispatch(setCategory(category))
    if (account) {
      dispatch(setEditCurrency(account.currency))
      dispatch(setAccount(account))
    }
  }

  return (
    <TransactionLayout onClick={OnClick} $type={type}>
      <CustomIcon
        icon={category && category.icon}
        boxColor={category && category.color}
      />
      <div className="info">
        <p className="category">{category && category.name}</p>
        <div className="account-info">
          <CustomIcon icon={account?.icon || ""} boxSize={"15px"} iconSize={"15px"} boxColor={"transparent"}
                      color={"var(--main-txt)"}
                      borderRadius={"0"} />
          <p>{account?.name}</p>
        </div>
        <h3 className="title">{title ? title : ""}</h3>
      </div>
      <span className="quantity">
        {FormatCurrencyString({
          currencySign: account
            ? (DefaultCurrencySigns.get(account.currency) as string)
            : "",
          quantity,
          formatString: currencyFormat,
          sign: quantity < 0 ? "-" : ""
        })}
      </span>
    </TransactionLayout>
  )
}
const TransactionLayout = styled.button<{
  $type?: TransactionType
}>`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 13px;
    gap: 12px;
    min-height: 60px;
    background-color: var(--sub-bg);
    box-shadow: 0px 2px 4px 0px #00000019;
    margin-bottom: 1px;

    .info {
        flex: 1 1 auto;

        .title {
            color: #a9a9a9;
            font-family: Inter;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        .category {
            text-align: start;
            color: var(--sub-txt);
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
            align-items: center;
            margin-bottom: 3px;

            .CustomIcon {
                width: 13px;
                height: 10px;
            }

            p {
                color: var(--main-txt);
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
        color: ${({ $type }) => ($type === "expense" ? "#E25E76" : "#0BAD7B")};
        font-family: Inter, sans-serif;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`
