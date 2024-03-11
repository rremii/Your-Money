import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useNavigate } from "react-router-dom"
import { useSignOutMutation } from "@entities/Auth/api/AuthApi.ts"
import { setAuthInitial } from "@entities/Auth/model/AuthSlice.ts"
import React from "react"
import { Modal } from "@shared/ui/Modal.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useTranslation } from "react-i18next"

export const SignOutMenu = React.memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isOpen = useTypedSelector((state) => state.UI.Modals.signOutMenu.isOpen)

  const [logout] = useSignOutMutation()

  const { t } = useTranslation()

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

  return (
    <>
      <Overlay onClick={CloseMenu} $isActive={isOpen} $zIndex={15} />
      <Modal $isOpen={isOpen}>
        <h2 className="title"> {t("signOutMenu.title")}</h2>
        <p className="content">{t("signOutMenu.content")}</p>
        <div className="btn-section">
          <button className="gray" onClick={CloseMenu}>
            {t("general.buttons.cancel")}
          </button>
          <button className="red" onClick={SignOut}>
            {t("signOutMenu.submit")}
          </button>
        </div>
      </Modal>
    </>
  )
})
