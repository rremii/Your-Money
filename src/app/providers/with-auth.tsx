import { FC, useEffect } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useRefreshQuery } from "@entities/Auth/api/AuthApi.ts"
import {
  setAuthRejected,
  setAuthSuccess,
} from "@entities/Auth/model/AuthSlice.ts"
import { useToast } from "@shared/hooks/useToast.tsx"

export const withAuth = (Component: FC) => () => {
  const dispatch = useAppDispatch()

  const { ShowToast } = useToast(5000, 1000)
  const { data, isLoading, isError, isUninitialized } = useRefreshQuery()
  useEffect(() => {

    if (!localStorage.getItem("accessToken")) dispatch(setAuthRejected())

    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }

    if (!data && isError) {
      dispatch(setAuthRejected())
      ShowToast("Please login, the maximum amount of transactions is limited by 20 and synchronization is not available")
    }
  }, [data, isError])

  const isFinished = !isUninitialized && !isLoading
  return <>
    {/*{isFinished && <Component />}*/}
    {<Component />}
  </>

}