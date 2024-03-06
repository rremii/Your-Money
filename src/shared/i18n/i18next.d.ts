// import the original type declarations
import "i18next"
// import all namespaces (for the default language, only)
import namespace from "./../../../public/locales/en/translation.json"

//todo learn ts declare module
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "namespace"
    // custom resources type
    resources: {
      namespace: typeof namespace
    }
    // other
  }
}
