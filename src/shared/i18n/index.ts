import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

//todo fix preloader with react suspens

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
