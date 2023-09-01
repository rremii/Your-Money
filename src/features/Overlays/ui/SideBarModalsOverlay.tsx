import React from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeAllMenus } from "@entities/SideBar/model/SideBarSlice.ts"

export const SideBarModalsOverlay = React.memo(() => {
  const dispatch = useAppDispatch()

  const isModalOverLay = useTypedSelector((state) => state.SideBar.isModalOverLay)

  const CloseAllModals = () => {
    dispatch(closeAllMenus())
  }

  return <Overlay onClick={CloseAllModals} $isActive={isModalOverLay} $zIndex={15} />
})