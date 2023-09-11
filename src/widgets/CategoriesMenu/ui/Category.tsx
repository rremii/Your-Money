import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React, { FC } from "react"
import { ICategory } from "@entities/Transaction/types.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setAccount,
  setCategory,
  setCurTransaction,
  setEditMenu
} from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { GetAccounts } from "@entities/Account/api/AccountsApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe, useGetMeQuery } from "@entities/User/api/UserApi.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"


interface props extends ICategory {
  quantity: number,
  dateTo: Date
}

export const Category: FC<props> = React.memo(({ color, quantity, icon, name, id, type, dateTo }) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.CurAccount.id)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  const OnClick = () => {
    if (!allAccounts) return

    dispatch(setEditMenu({
      isOpen: true,
      menuType: "create"
    }))


    const account = allAccounts.find((account) => account.id === curAccId) || allAccounts[0]
    const category = { name, color, icon }
    const date = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(), dateTo.getHours() - 1)

    dispatch(setCurTransaction({
      id: null,
      categoryId: id,
      accountId: curAccId,
      title: "",
      dateStr: date.toUTCString(),
      quantity: 0,
      type,
      category,
      account
    }))

  }

  return <CategoryLayout onClick={OnClick} $color={quantity ? color : ""}>
    <h3 className="title">
      {name}
    </h3>
    <div className="icon">
      <img src={CategoriesIcons.get(icon)} alt="category icon" />
    </div>
    <p className="quantity">
      Br {quantity}
    </p>
  </CategoryLayout>
})
const CategoryLayout = styled.div<{
  $color?: string
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  .title {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .icon {
    width: 45px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .quantity {
    color: ${({ $color }) => $color ? $color : "var(--txt-2)"};
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`