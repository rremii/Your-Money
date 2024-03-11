import { AuthHeader } from "@widgets/AuthHeader"
import { useTranslation } from "react-i18next"

export const SignUpHeader = () => {
  const { t } = useTranslation()

  return <AuthHeader>{t("signUpHeader")}</AuthHeader>
}
