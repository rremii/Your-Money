import { useEffect } from "react"

export const usePreloader = () => {
  useEffect(() => {
    if (location.pathname !== "/transactions") return
    const preloader = document.getElementById("preloader")
    if (preloader) preloader.remove()
  }, [])
}