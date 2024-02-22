import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useStartScreen = () => {
  const navigate = useNavigate()

  const curScreen = useTypedSelector((state) => state.Settings.startScreen)

  const startScreenPath = "/" + curScreen.toLowerCase()
  useEffect(() => {
    if (location.pathname !== startScreenPath) navigate(startScreenPath)
  }, [])
}
