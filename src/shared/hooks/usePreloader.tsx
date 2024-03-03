import { useEffect } from "react"
import { loggedInType } from "@entities/Auth/model/AuthSlice.ts"

export const usePreloader = (isLoggedIn: loggedInType) => {
  useEffect(() => {
    if (isLoggedIn === "first loading") return
    const preloader = document.getElementById("preloader")
    if (preloader) preloader.remove()
  }, [isLoggedIn])
}
