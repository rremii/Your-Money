import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"
import PlusIcon from "@icons/general/add.svg?react"


export const StartCreatingTrans = () => {
  const dispatch = useAppDispatch()

  const curMenuDate = useTypedSelector((state) => state.Date.curMenu.dateFrom)
  const loginState = useTypedSelector((state) => state.Auth.isLoggedIn)

  const OnClick = () => {
    dispatch(openMenu("chooseCategorySlideMenu"))
    dispatch(setEditTransQuantity(0))
    dispatch(setEditTransDateStr(curMenuDate))
  }

  if (loginState !== "success") return ""
  return <CreatingTransLayout onClick={OnClick}><PlusIcon className="icon" /></CreatingTransLayout>
}
const CreatingTransLayout = styled.button`
    cursor: pointer;
    color: #ffffff;
    background-color: var(--account-color);
    position: absolute;
    font-size: 30px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 50;
    bottom: 25px;
    right: 25px;

    .icon {
        width: 18px !important;
        height: 18px !important;
        fill: white;
    }
`
