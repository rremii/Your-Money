import styled from "styled-components"
import React, { FC } from "react"

interface props {
  children: React.ReactNode
}

export const InfoSubHeader: FC<props> = ({ children }) => {
  return <SubHeaderLayout>{children}</SubHeaderLayout>
}
const SubHeaderLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 7px 10px;
  justify-content: center;
  color: var(--txt-1);
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
