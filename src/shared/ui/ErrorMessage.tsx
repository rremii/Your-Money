import styled from "styled-components"
import React, { FC } from "react"

interface props {
  children: React.ReactNode
}

export const ErrorMessage: FC<props> = ({ children }) => {
  return <ErrorLayout>{children}</ErrorLayout>
}
const ErrorLayout = styled.div`
  color: var(--error-1);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
