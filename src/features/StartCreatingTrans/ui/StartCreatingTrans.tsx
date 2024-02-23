import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { setEditTransQuantity } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"

export const StartCreatingTrans = () => {
  const dispatch = useAppDispatch()

  const curMenuDate = useTypedSelector((state) => state.Date.curMenu.dateFrom)

  const OnClick = () => {
    dispatch(openMenu("chooseCategorySlideMenu"))
    dispatch(setEditTransQuantity(0))
    dispatch(setEditTransDateStr(curMenuDate))
  }

  return <CreatingTransLayout onClick={OnClick}>+</CreatingTransLayout>
}
const CreatingTransLayout = styled.div`
  cursor: pointer;
  color: var(--txt-1);
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
`
