import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRefreshQuery } from "@entities/Auth/api/AuthApi.ts"
import { setAuthRejected, setAuthSuccess } from "@entities/Auth/model/AuthSlice.ts"
import { useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useTranslation } from "react-i18next"

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const language = useTypedSelector((state) => state.Settings.language)
  const { data, isError } = useRefreshQuery()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) dispatch(setAuthRejected())

    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }

  }, [data, isError, language])
}
