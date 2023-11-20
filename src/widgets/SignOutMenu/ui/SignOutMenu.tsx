import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useNavigate } from "react-router-dom"
import { useSignOutMutation } from "@entities/Auth/api/AuthApi.ts"
import { setAuthInitial } from "@entities/Auth/model/AuthSlice.ts"
import React from "react"
import { Modal } from "@shared/ui/Modal.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"

export const SignOutMenu = React.memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isOpen = useTypedSelector(state => state.UI.Modals.signOutMenu.isOpen)

  const [logout] = useSignOutMutation()

  const SignOut = async () => {
    await logout()
    dispatch(setAuthInitial())
    localStorage.removeItem("accessToken")
    navigate("/sign-in")
    CloseMenu()
    dispatch(closeMenu("sideBar"))
  }
  const CloseMenu = () => {
    dispatch(closeMenu("signOutMenu"))
  }


  return <>
    <Overlay onClick={CloseMenu} $isActive={isOpen} $zIndex={15} />
    <Modal $isOpen={isOpen}>
      <h2 className="title">Sign out?</h2>
      <p className="content">Data synchronization and other features
        will be disabled in offline.</p>
      <div className="btn-section">
        <button className="gray" onClick={CloseMenu}>CANCEL</button>
        <button className="red" onClick={SignOut}>SIGN OUT</button>
      </div>
    </Modal>
  </>
})

