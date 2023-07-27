import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRefreshQuery } from "@entities/Auth/api/AuthApi.ts"
import { setAuthRejected, setAuthSuccess } from "@entities/Auth/model/AuthSlice.ts"


export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)
  const isPending = useTypedSelector((state) => state.Auth.isPending)


  const { data, isError } = useRefreshQuery()


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) dispatch(setAuthRejected())
    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }
    if (!data && isError) dispatch(setAuthRejected())
  }, [data, isError])


  return { isPending, isLoggedIn }
}