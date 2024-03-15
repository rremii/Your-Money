// import the original type declarations
import "i18next"
// import all namespaces (for the default language, only)
import namespaceEn from "./../../../public/locales/en/translation.json"
import namespaceRu from "./../../../public/locales/ru/translation.json"

//todo learn ts declare module
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "namespaceEn"
    // custom resources type
    resources: {
      namespaceEn: typeof namespaceEn
      namespaceRu: typeof namespaceRu
    }
  }
}
