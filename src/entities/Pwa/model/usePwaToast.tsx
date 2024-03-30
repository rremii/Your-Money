import { useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { IsPwa } from "@entities/Pwa/helpers/IsPwa.ts"

export const usePwaToast = () => {
  const { t } = useTranslation()

  const { ShowToast } = useNotifyToast(4000, 2000)

  useEffect(() => {
    if (!IsPwa() && !sessionStorage.getItem("isPwaShown")) {
      ShowToast({ state: "info", message: t("toastPWA") })
      sessionStorage.setItem("isPwaShown", "true")
    }
  }, [])
}