import styled from "styled-components"
import React, { FC } from "react"
import Categories from "@shared/assets/LightTheme/categories.png"

interface props {
  children: React.ReactNode
}

export const AuthHeader: FC<props> = ({ children }) => {
  const GoToPrevPage = () => {
    window.history.back()
  }

  return (
    <AuthHeaderLayout>
      <img onClick={GoToPrevPage} src={Categories} alt="arrow back" />
      {children}
    </AuthHeaderLayout>
  )
}
const AuthHeaderLayout = styled.header`
  display: flex;
  color: #ffffff;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: #5c6ac0;
  height: 55px;
  align-items: center;
  padding-left: 28px;
  gap: 13px;

  img {
    width: 25px;
    height: 25px;
  }
`
