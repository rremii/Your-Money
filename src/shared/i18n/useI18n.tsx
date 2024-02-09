import { useTranslation } from "react-i18next"
import { useEffect } from "react"

export const useI18n = (language: string) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
}
