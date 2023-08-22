import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { redirect, useNavigate } from "react-router-dom"
import { useSignOutMutation } from "@entities/Auth/api/AuthApi.ts"
import { setIsSideBar } from "@entities/SideBar"
import { setAuthInitial } from "@entities/Auth/model/AuthSlice.ts"
import { closeAllMenus } from "@entities/SideBar/model/SideBarSlice.ts"
import React from "react"
import { SideBarModal } from "@shared/ui/SideBarModal.tsx"

export const SignOutMenu = React.memo(() => {
  const dispatch = useAppDispatch()


  const isSignOut = useTypedSelector(state => state.SideBar.isSignOutMenu)

  const [logout] = useSignOutMutation()

  const SignOut = async () => {
    await logout()
    dispatch(setIsSideBar(false))
    dispatch(setAuthInitial())
    localStorage.removeItem("accessToken")
    redirect("/sign-in")
    dispatch(closeAllMenus())
  }

  const CloseMenu = () => {
    dispatch(closeAllMenus())
  }

  return <SideBarModal $isOpen={isSignOut}>
    <h2 className="title">Sign out?</h2>
    <p className="content">Data synchronization and other features
      will be disabled in offline.</p>
    <div className="btn-section">
      <button className="gray" onClick={CloseMenu}>CANCEL</button>
      <button className="red" onClick={SignOut}>SIGN OUT</button>
    </div>
  </SideBarModal>
})

