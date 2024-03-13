import { FC, useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRefreshQuery } from "@entities/Auth/api/AuthApi.ts"
import {
  setAuthRejected,
  setAuthSuccess,
} from "@entities/Auth/model/AuthSlice.ts"
import { useNotifyToast } from "@shared/GlobalModules/Toasts"
import { useTranslation } from "react-i18next"

//todo make it hook
export const withAuth = (Component: FC) => () => {
  const dispatch = useAppDispatch()

  const { ShowToast } = useNotifyToast(5000, 1000)
  const { t } = useTranslation()
  const { data, isLoading, isError, isUninitialized } = useRefreshQuery()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) dispatch(setAuthRejected())

    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }

    if (!data && isError) {
      dispatch(setAuthRejected())
      ShowToast({
        message: t("toastOfflineWarn"),
        state: "info",
      })
    }
  }, [data, isError])

  const isFinished = !isUninitialized && !isLoading
  return (
    <>
      {/*{isFinished && <Component />}*/}
      {<Component />}
    </>
  )
}
