import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { IconColorPickerModal } from "@shared/modules/IconColorPicker"
import {
  setNewCategoryColor,
  setNewCategoryIcon,
} from "@entities/Category/model/NewCategorySlice.ts"

export const CategoryIconPickerModal = memo(() => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.categoryIconPickerMenu.isOpen,
  )
  const icon = useTypedSelector((state) => state.NewCategory.icon)
  const color = useTypedSelector((state) => state.NewCategory.color)

  const CloseIconColorPicker = () => {
    dispatch(closeMenu("categoryIconPickerMenu"))
  }

  const OnSubmit = ({ icon, color }: { icon: string; color: string }) => {
    dispatch(setNewCategoryColor(color))
    dispatch(setNewCategoryIcon(icon))
    dispatch(closeMenu("categoryIconPickerMenu"))
  }

  return (
    <IconColorPickerModal
      type={"category"}
      icon={icon}
      color={color}
      isOpen={isOpen}
      OnSubmit={OnSubmit}
      OnClose={CloseIconColorPicker}
    />
  )
})
