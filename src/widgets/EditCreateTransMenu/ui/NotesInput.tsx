import styled from "styled-components"
import { FC, memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"

interface props {
  content?: string
}

export const Notes: FC<props> = memo(({ content }) => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(state => state.UI.Modals.editCreateTransMenu.menuType)

  const OpenEditMenu = () => {
    dispatch(openMenu("titleMenu"))
    if (menuType === "overview")
      dispatch(setEditCreateMenuType("edit"))
  }

  return <InputLayout onClick={OpenEditMenu}>
    {content || "Notes ..."}
  </InputLayout>
})
const InputLayout = styled.div`
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-1);
  color: var(--txt-2);
  font-family: Inter;
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  padding: 0 10px;
  cursor: pointer;

`