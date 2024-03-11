import { InfoCell } from "@shared/ui/InfoCell.tsx"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import React, { useCallback } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"

export const OpenChooseAccountMenu = () => {
  const dispatch = useAppDispatch()
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )
  const account = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenAccount,
  )

  const { t } = useTranslation()

  const OnClick = useCallback(() => {
    dispatch(openMenu("chooseAccountMenu"))
    if (menuType === "overview") dispatch(setEditCreateMenuType("edit"))
  }, [menuType])

  return (
    <InfoCell
      OnClick={OnClick}
      iconNode={
        <CustomIcon
          boxSize="100%"
          iconSize={"50%"}
          icon={account.icon}
          boxColor="transparent"
          color={account.color}
        />
      }
      color={account.color}
      content={account.name}
      iconRadius={"5px"}
      title={t("transactionMenu.accountInfo.title")}
    />
  )
}
