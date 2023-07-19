import AppLayout from "../../app/layout/AppLayout.tsx"
import styled from "styled-components"
import { AuthHeader } from "@widgets/AuthHeader"
import React from "react"
import { SignUpCodeMenu } from "@widgets/SignUpCodeMenu/ui/SignUpCodeMenu.tsx"

const SignUpCode = () => {
  return (
    <LayoutSignUpLayout>
      <AuthHeader>Sign up</AuthHeader>
      <SignUpCodeMenu />
    </LayoutSignUpLayout>
  )
}
export default SignUpCode
const LayoutSignUpLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //max-width: 450px;
  position: relative;
  font-size: 30px;
  background-color: var(--bg-1);
  //overflow-x: hidden;
  main {
    flex: 1 1 auto;
  }
`
