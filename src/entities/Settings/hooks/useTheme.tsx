import { useEffect } from "react"
import { SetStyleProperty } from "@entities/Settings/helpers/SetStyleProperty.tsx"
import { DarkTheme, LightTheme } from "@entities/Settings/constants/Themes.ts"
import { themeType } from "@entities/Settings/types.ts"

export const useTheme = (theme: themeType) => {
  useEffect(() => {
    if (theme === "dark")
      DarkTheme.forEach(({ property, value }) => {
        SetStyleProperty(property, value)
      })
    if (theme === "light")
      LightTheme.forEach(({ property, value }) => {
        SetStyleProperty(property, value)
      })
  }, [theme])
}
