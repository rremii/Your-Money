import React from "react"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setIsSideBar } from "@entities/SideBar"

export const SideBarOverlay = React.memo(() => {
  const dispatch = useAppDispatch()

  const isSideBar = useTypedSelector((state) => state.SideBar.isSideBarOpen)

  const CloseSideBar = () => {
    dispatch(setIsSideBar(false))
  }


  return <Overlay onClick={CloseSideBar} $isActive={isSideBar} $zIndex={5} />
})