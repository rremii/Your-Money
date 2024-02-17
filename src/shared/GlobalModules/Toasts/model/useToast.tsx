import { useEffect } from "react"

interface props<ShowT> {
  duration: number
  delay?: number
  isShown: boolean
  DoAfterHide: () => void
  HideToast: () => void
  ShowToast: (props: ShowT) => void
}

export const useToast = <ShowT,>({
  HideToast,
  ShowToast,
  DoAfterHide,
  delay,
  isShown,
  duration,
}: props<ShowT>) => {
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      HideToast()
    }, duration)
    const clearTimer = setTimeout(() => {
      DoAfterHide()
    }, duration + 1000)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(clearTimer)
    }
  }, [isShown])

  const OpenToast = (props: ShowT) => {
    let delayTimer: NodeJS.Timer

    new Promise((resolve) => {
      delayTimer = setTimeout(() => {
        ShowToast(props)
        resolve("")
      }, delay || 0)
    }).finally(() => {
      window.clearTimeout(delayTimer)
    })
  }

  return {
    OpenToast,
  }
}
