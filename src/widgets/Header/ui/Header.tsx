import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IsCurDateToday } from "@entities/DateSlider/model/DateSliderSlice.ts"
import { Burger } from "@features/Burger/ui/Burger.tsx"

interface props {
  children?: React.ReactNode
}

export const Header: FC<props> = ({ children }) => {
  const isCurDateToday = useTypedSelector(IsCurDateToday)

  return (
    <HeaderLayout id="header" $isActive={isCurDateToday}>
      <Burger />
      {children}
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--account-color)" : "#707070"};
  transition: 1s;
  position: relative;
  box-shadow: 0px 2px 4px 0px #0000003f;
  z-index: 4;
`
