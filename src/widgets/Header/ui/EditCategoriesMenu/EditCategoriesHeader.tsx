import styled from "styled-components"
import { useTranslation } from "react-i18next"

export const EditCategoriesHeader = () => {
  const { t } = useTranslation()

  return <HeaderLayout>{t("editCategoriesMenu.title")}</HeaderLayout>
}
const HeaderLayout = styled.header`
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 60px;
  color: #ffffff;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
