import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setChooseCategorySlideMenu } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"
import { setEditTransDateStr } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"

export const StartCreatingTrans = () => {
  const dispatch = useAppDispatch()

  const curMenuDate = useTypedSelector(state => state.Date.curMenu.dateFrom)

  const OnClick = () => {
    dispatch(setChooseCategorySlideMenu(true))
    dispatch(setEditTransDateStr(curMenuDate))
  }

  return <CreatingTransLayout onClick={OnClick}>
    +
  </CreatingTransLayout>
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