import React, { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { clearMessage, hideToast, showToast } from "@shared/store/globalSlices/ToastSlice.ts"

//todo switch toast to react context
export const useToast = (duration: number, delay?: number) => {
  const dispatch = useAppDispatch()


  const isShown = useTypedSelector(state => state.Toast.isShown)


  useEffect(() => {


    const hideTimer = setTimeout(() => {
      dispatch(hideToast())
    }, duration)
    const clearTimer = setTimeout(() => {
      dispatch(clearMessage())
    }, duration + 1000)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(clearTimer)
    }

  }, [isShown])

  const ShowToast = (message: string) => {
    let delayTimer: NodeJS.Timer

    new Promise((resolve) => {
      delayTimer = setTimeout(() => {

        dispatch(showToast(message))
        resolve("")

      }, delay || 0)
    }).then(() => {
      window.clearTimeout(delayTimer)
    })

  }

  return {
    ShowToast
  }


}
