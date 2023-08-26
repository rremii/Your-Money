import styled from "styled-components"
import React, { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { getIsMenuIdZero } from "@entities/Account/model/AccountSlice.ts"
import { TopHeader } from "@widgets/Header/ui/TopHeader.tsx"

interface props {
  right?: React.ReactNode
  left?: React.ReactNode
  center?: React.ReactNode
  SubHeader?: React.ReactNode
}

export const Header: FC<props> = ({ right, SubHeader }) => {


  const isMenuIdZero = useTypedSelector(getIsMenuIdZero)


  return (
    <HeaderLayout $isActive={isMenuIdZero}>
      <TopHeader right={right} />
      {SubHeader}
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  background-color: ${({ $isActive }) => $isActive ? "var(--account-color)" : "var(--bg-11)"};
  transition: 1s;

  box-shadow: 0px 2px 4px 0px var(--shadow-3);
  z-index: 1;


`
