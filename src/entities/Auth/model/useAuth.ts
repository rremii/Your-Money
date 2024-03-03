import { useEffect } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useRefreshQuery } from "@entities/Auth/api/AuthApi.ts"
import {
  setAuthRejected,
  setAuthSuccess,
} from "@entities/Auth/model/AuthSlice.ts"


//todo bring it to context
export const useAuth = () => {
  const dispatch = useAppDispatch()

  const { data, isError } = useRefreshQuery()


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) dispatch(setAuthRejected())
    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }
    if (!data && isError) dispatch(setAuthRejected())
  }, [data, isError])


}