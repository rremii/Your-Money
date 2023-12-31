import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { getIsMenuIdZero } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { Burger } from "@features/Burger/ui/Burger.tsx"

interface props {
  children?: React.ReactNode
}

export const Header: FC<props> = ({ children }) => {


  const isMenuIdZero = useTypedSelector(getIsMenuIdZero)


  return (
    <HeaderLayout id="header" $isActive={isMenuIdZero}>
      <Burger />
      {children}
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  background-color: ${({ $isActive }) => $isActive ? "var(--account-color)" : "var(--bg-11)"};
  transition: 1s;
  position: relative;
  box-shadow: 0px 2px 4px 0px var(--shadow-3);
  z-index: 4;


`
