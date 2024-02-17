import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  hideNotifyToast,
  notifyToastShowProps,
  resetNotifyToast,
  showNotifyToast,
} from "@shared/GlobalModules/Toasts/model/NotifyToastSlice.ts"
import { useToast } from "@shared/GlobalModules/Toasts/model/useToast.tsx"

export const useNotifyToast = (duration: number, delay?: number) => {
  const dispatch = useAppDispatch()

  const isShown = useTypedSelector((state) => state.Toasts.NotifyToast.isShown)

  const HideToast = () => {
    dispatch(hideNotifyToast())
  }
  const ClearMessage = () => {
    dispatch(resetNotifyToast())
  }
  const ShowToast = ({ message, state }: notifyToastShowProps) => {
    dispatch(showNotifyToast({ message, state }))
  }

  const { OpenToast } = useToast<notifyToastShowProps>({
    ShowToast,
    DoAfterHide: ClearMessage,
    HideToast,
    isShown,
    delay,
    duration,
  })

  return {
    ShowToast: OpenToast,
  }
}
