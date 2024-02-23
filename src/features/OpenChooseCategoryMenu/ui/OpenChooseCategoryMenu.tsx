import { InfoCell } from "@shared/ui/InfoCell.tsx"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"
import React, { useCallback } from "react"
import {
  openMenu,
  setEditCreateMenuType,
} from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const OpenChooseCategoryMenu = () => {
  const dispatch = useAppDispatch()
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateTransMenu.menuType,
  )
  const category = useTypedSelector(
    (state) => state.EditCreateTransaction.ChosenCategory,
  )

  const OnClick = useCallback(() => {
    dispatch(openMenu("chooseCategoryMenu"))
    if (menuType === "overview") dispatch(setEditCreateMenuType("edit"))
  }, [menuType])

  return (
    <InfoCell
      OnClick={OnClick}
      iconNode={
        <CustomIcon
          boxSize="100%"
          iconSize={"50%"}
          icon={category.icon}
          boxColor="transparent"
          color={category.color}
        />
      }
      color={category.color}
      content={category.name}
      iconRadius={"50%"}
      title={"To category"}
    />
  )
}
