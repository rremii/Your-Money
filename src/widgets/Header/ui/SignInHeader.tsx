import { AuthHeader } from "@widgets/AuthHeader"
import { useTranslation } from "react-i18next"

export const SignInHeader = () => {
  const { t } = useTranslation()

  return <AuthHeader>{t("signInHeader")}</AuthHeader>
}
