import styled from "styled-components"
import { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const Notes = memo(() => {
  const dispatch = useAppDispatch()

  const content = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.title,
  )
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )

  const { t } = useTranslation()

  const OpenEditMenu = () => {
    dispatch(openMenu("titleMenu"))
    if (menuType === "overview") dispatch(setEditCreateMenuType("edit"))
  }

  return (
    <InputLayout onClick={OpenEditMenu}>
      {content || t("transactionMenu.description")}
    </InputLayout>
  )
})
const InputLayout = styled.button`
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sub-bg);

  color: #7d7d7d;
  font-family: Inter;
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  padding: 0 10px;
  cursor: pointer;
`
