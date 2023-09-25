import styled from "styled-components"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setChangeTitleMenu, setMenuType } from "@entities/CurTransaction/model/CurTransactionSlice.ts"

interface props {
  content?: string
}

export const Notes: FC<props> = ({ content }) => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(state => state.CurTransaction.editMenuType)


  const OpenEditMenu = () => {
    dispatch(setChangeTitleMenu(true))
    if (menuType === "overview")
      dispatch(setMenuType("edit"))
  }

  return <InputLayout onClick={OpenEditMenu}>
    {content || "Notes ..."}
  </InputLayout>
}
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