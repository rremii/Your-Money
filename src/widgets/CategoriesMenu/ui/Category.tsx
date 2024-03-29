import styled from "styled-components"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { setEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { ICategory } from "@entities/Category/type.ts"
import {
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import { FormatCurrencyString } from "@entities/Settings/helpers/FormatCurrency.ts"

interface props extends ICategory {
  quantity: number
  dateTo: Date
}

//todo make it shared
export const Category: FC<props> = React.memo(
  ({ color, quantity, icon, name, id, type, dateTo }) => {
    const dispatch = useAppDispatch()

    const curAccId = useTypedSelector((state) => state.CurAccount.id)
    const curCurrencySign = useTypedSelector(
      (state) => state.Settings.curCurrencySign,
    )
    const currencyFormat = useTypedSelector(
      (state) => state.Settings.currencyFormat,
    )

    const { data: user } = GetMe.useQueryState()
    const { getAccountById } = useAccount(user?.id)

    const OnClick = () => {
      dispatch(setEditCreateMenuType("create"))
      dispatch(openMenu("editCreateTransMenu"))

      const account = getAccountById(curAccId)
      const category = { name, color, icon, id }
      const date = new Date(
        dateTo.getFullYear(),
        dateTo.getMonth(),
        dateTo.getDate(),
        dateTo.getHours() - 1,
      )

      dispatch(
        setEditTransaction({
          id: null,
          title: "",
          dateStr: date.toUTCString(),
          type,
        }),
      )
      dispatch(setEditTransQuantity(0))
      dispatch(setCategory(category))
      if (account) dispatch(setAccount(account))
    }

    return (
      <CategoryLayout onClick={OnClick} $color={quantity ? color : ""}>
        <h3 className="title">{name}</h3>
        <CustomIcon icon={icon} boxColor={color} />
        <p className="quantity">
          {FormatCurrencyString({
            currencySign: curCurrencySign,
            quantity,
            formatString: currencyFormat,
            sign: quantity < 0 ? "-" : "",
          })}
        </p>
      </CategoryLayout>
    )
  },
)
const CategoryLayout = styled.button<{
  $color?: string
}>`
  display: inline-flex;
  width: min-content;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  .title {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .quantity {
    color: ${({ $color }) => ($color ? $color : "var(--pale-txt)")};
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
