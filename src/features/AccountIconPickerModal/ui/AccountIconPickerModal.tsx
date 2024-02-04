import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { IconColorPicker, IconColorPickerModal } from "@shared/modules/IconColorPicker"
import { setNewCategoryColor, setNewCategoryIcon } from "@entities/Category/model/NewCategorySlice.ts"
import { setNewAccountColor, setNewAccountIcon } from "@entities/Account/model/NewAccountSlice.ts"

export const AccountIconPickerModal = memo(() => {
  const dispatch = useAppDispatch()


  const isOpen = useTypedSelector(state => state.UI.Modals.accountIconPickerMenu.isOpen)
  const icon = useTypedSelector(state => state.NewAccount.icon)
  const color = useTypedSelector(state => state.NewAccount.color)

  const CloseIconColorPicker = () => {
    dispatch(closeMenu("accountIconPickerMenu"))
  }

  const OnSubmit = ({ icon, color }: { icon: string, color: string }) => {
    dispatch(setNewAccountColor(color))
    dispatch(setNewAccountIcon(icon))
    dispatch(closeMenu("accountIconPickerMenu"))
  }

  return <IconColorPickerModal icon={icon} color={color} isOpen={isOpen} OnSubmit={OnSubmit}
                               OnClose={CloseIconColorPicker} />
})
