import styled from "styled-components"
import React, { FC } from "react"

interface props {
  children: React.ReactNode
}

export const ErrorMessage: FC<props> = ({ children }) => {
  return <ErrorLayout className="ErrorMessage">{children}</ErrorLayout>
}
const ErrorLayout = styled.div`
  color: #dd724e;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
