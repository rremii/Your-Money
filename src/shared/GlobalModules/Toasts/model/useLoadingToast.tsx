import { useEffect } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import {
  hideLoadingToast,
  loadingToastShowProps,
  resetLoadingToast,
  showLoadingToast,
} from "@shared/GlobalModules/Toasts/model/LoadingToastSlice.ts"

export const useLoadingToast = (isShown: boolean, message: string) => {
  const dispatch = useAppDispatch()

  const HideToast = () => {
    dispatch(hideLoadingToast())
  }
  const ClearMessage = () => {
    dispatch(resetLoadingToast())
  }
  const ShowToast = ({ message }: loadingToastShowProps) => {
    dispatch(showLoadingToast({ message }))
  }

  useEffect(() => {
    if (isShown) ShowToast({ message })
    else {
      HideToast()
      ClearMessage()
    }
  }, [isShown])
}
