import styled from "styled-components"
import React from "react"
import { useTranslation } from "react-i18next"

export const AccountsSubHeader = () => {
  const { t } = useTranslation()
  return (
    <SubHeaderLayout>
      <span className="cell">{t("general.accounts")}</span>
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  height: 30px;

  .cell {
    width: 150px;
    height: 100%;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    color: #ffffff;
    font-family: Inter;
    padding: 0 0 10px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      height: 3px;
      border-radius: 10px 10px 0px 0px;
    }
  }
`
