import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { setEditTransaction } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { setCategory } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import { ICategory } from "@entities/Category/type.ts"
import { openMenu, setEditCreateMenuType } from "@entities/Modals/model/ModalsSlice.ts"
import { Currency } from "@entities/Account/types.ts"


interface props extends ICategory {
  quantity: number,
  dateTo: Date
}

export const Category: FC<props> = React.memo(({ color, quantity, icon, name, id, type, dateTo }) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.CurAccount.id)


  const { data: user } = GetMe.useQueryState()
  const { getAccountById } = useAccount(user?.id)

  const OnClick = () => {

    dispatch(setEditCreateMenuType("create"))
    dispatch(openMenu("editCreateTransMenu"))


    const account = getAccountById(curAccId)
    const category = { name, color, icon, id }
    const date = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(), dateTo.getHours() - 1)

    dispatch(setEditTransaction({
      id: null,
      title: "",
      dateStr: date.toUTCString(),
      type
    }))
    dispatch(setEditTransQuantity(quantity))
    dispatch(setCategory(category))
    if (account)
      dispatch(setAccount(account))

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