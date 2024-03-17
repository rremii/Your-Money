import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

i18n
  .use(initReactI18next)
  .use(Backend)
  .init(
    {
      fallbackLng: ["en", "ru"],
      initImmediate: false,
      interpolation: {
        escapeValue: false,
      },
    },
    (err, t) => {
      if (err) return console.log("something went wrong loading", err)
    },
  )

export default i18n
