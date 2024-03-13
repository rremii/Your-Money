import { useEffect, useState } from "react"

interface props<ShowT> {
  duration: number
  delay?: number
  isToastShown: boolean
  DoAfterHide: () => void
  HideToast: () => void
  ShowToast: (props: ShowT) => void
}

export const useToast = <ShowT,>({
  HideToast,
  ShowToast,
  DoAfterHide,
  delay,
  isToastShown,
  duration,
}: props<ShowT>) => {
  const [isShown, setShown] = useState<boolean>(false)

  useEffect(() => {
    if (!isShown) return

    const hideTimer = setTimeout(() => {
      HideToast()
      setShown(false)
    }, duration)
    const clearTimer = setTimeout(() => {
      DoAfterHide()
    }, duration + 1500)

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
        setShown(true)
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
