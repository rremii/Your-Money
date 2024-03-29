import styled from "styled-components"
import { useTranslation } from "react-i18next"

export const ORSeparator = () => {
  const { t } = useTranslation()

  return (
    <OrSeparatorLayout className="OrSeparator">
      {t("general.or")}
    </OrSeparatorLayout>
  )
}
const OrSeparatorLayout = styled.div`
  color: #818181;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;

  &::after {
    z-index: -2;
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #818181;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &::before {
    content: "";
    position: absolute;
    width: 45px;
    height: 25px;
    z-index: -1;
    background-color: var(--main-bg);
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`
