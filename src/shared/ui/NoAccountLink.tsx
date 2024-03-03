import styled from "styled-components"
import { NavLink } from "react-router-dom"
import React from "react"

export const NoAccountLink = () => {
  return (
    <LinkLayout>
      <NavLink to="/sign-up/email">Don't have an account?</NavLink>
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
