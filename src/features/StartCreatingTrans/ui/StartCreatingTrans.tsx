import styled from "styled-components"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setChooseCategorySlideMenu } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"

export const StartCreatingTrans = () => {
  const dispatch = useAppDispatch()

  const OnClick = () => {
    dispatch(setChooseCategorySlideMenu(true))
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