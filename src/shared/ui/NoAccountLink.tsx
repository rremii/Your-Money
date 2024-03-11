import styled from "styled-components"
import { NavLink } from "react-router-dom"
import React from "react"
import { useTranslation } from "react-i18next"

export const NoAccountLink = () => {
  const { t } = useTranslation()

  return (
    <LinkLayout>
      <NavLink to="/sign-up/email">{t("signInMenu.noAccountLink")}</NavLink>
    </LinkLayout>
  )
}
const LinkLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;

  a {
    color: #818181;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
  }
`
