import "i18next"
import namespaceEn from "./../../../public/locales/en/translation.json"
import namespaceRu from "./../../../public/locales/ru/translation.json"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "namespaceEn"
    resources: {
      namespaceEn: typeof namespaceEn
      namespaceRu: typeof namespaceRu
    }
  }
}
