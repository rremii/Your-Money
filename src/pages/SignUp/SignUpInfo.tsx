import styled from "styled-components"
import { AuthHeader } from "@widgets/AuthHeader"
import React from "react"
import { SignUpInfoMenu } from "@widgets/SignUpInfoMenu/ui/SignUpInfoMenu.tsx"

const SignUpPassword = () => {
  return (
    <LayoutSignUpLayout>
      <AuthHeader>Sign up</AuthHeader>
      <SignUpInfoMenu />
    </LayoutSignUpLayout>
  )
}
export default SignUpPassword
const LayoutSignUpLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //max-width: 450px;
  position: relative;
  font-size: 30px;
  background-color: white;
  //overflow-x: hidden;

  main {
    flex: 1 1 auto;
  }
`
