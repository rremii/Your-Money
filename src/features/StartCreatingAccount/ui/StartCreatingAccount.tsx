import styled from "styled-components"
import { FC } from "react"
import {
  openMenu,
  setEditAccountMenuType
} from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { GetRandomColor } from "@shared/modules/IconColorPicker/utils/GetRandomColor.ts"
import { setCreateAccount } from "@entities/Account/model/NewAccountSlice.ts"
import { GetRandomAccountIcon } from "@shared/modules/IconColorPicker/utils/GetRandomAccountIcon.ts"
import { Currency } from "@entities/Currency/types.ts"
import AddIcon from "@icons/general/add.svg?react"

interface props {
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
        currency: Currency.DefaultCurrency
      })
    )
    dispatch(setEditAccountMenuType("create"))
  }

  return (
    <CreatingCategoryLayout onClick={CreateAccount}>
      <AddIcon className="icon" />
    </CreatingCategoryLayout>
  )
}
const CreatingCategoryLayout = styled.button`
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 35px !important;
    height: 35px !important;

    .icon {
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        fill: white;
    }


`
