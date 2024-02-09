import { useCallback, useEffect, useRef } from "react"

export default function useDebounce(fn: () => void, delay: number) {
  const timeoutRef = useRef<number>()

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
  }, [])

  useEffect(() => clearTimer, [])

  const cb = useCallback(
    (...args: any[]) => {
      clearTimer()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      timeoutRef.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay],
  )

  return cb
}