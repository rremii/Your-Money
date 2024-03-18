import styled from "styled-components"
import { FC } from "react"
import Categories from "@shared/assets/LightTheme/categories.png"
import {
  openMenu,
  setEditAccountMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { GetRandomColor } from "@shared/modules/IconColorPicker/utils/GetRandomColor.ts"
import { setCreateAccount } from "@entities/Account/model/NewAccountSlice.ts"
import { GetRandomAccountIcon } from "@shared/modules/IconColorPicker/utils/GetRandomAccountIcon.ts"
import { Currency } from "@entities/Currency/types.ts"

interface props {
  // categoryType: TransactionType
}

export const StartCreatingAccount: FC<props> = () => {
  const dispatch = useAppDispatch()

  const { data: user } = GetMe.useQueryState()

  const CreateAccount = () => {
    if (!user) return
    dispatch(openMenu("editCreateAccountMenu"))
    dispatch(
      setCreateAccount({
        color: GetRandomColor(),
        icon: GetRandomAccountIcon(),
        name: "",
        balance: 0,
        currency: Currency.DefaultCurrency,
      }),
    )
    dispatch(setEditAccountMenuType("create"))
  }

  return (
    <CreatingCategoryLayout onClick={CreateAccount}>
      <div className="icon">
        <img src={Categories} alt="create category" />
      </div>
    </CreatingCategoryLayout>
  )
}
const CreatingCategoryLayout = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
  }
`
