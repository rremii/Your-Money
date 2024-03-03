import styled from "styled-components"
import React from "react"
import { AuthHeader } from "@widgets/AuthHeader"
import { SignInMenu } from "@widgets/SignInMenu/ui/SignInMenu.tsx"

const SignIn = () => {
  return (
    <LayoutSignInLayout>
      <AuthHeader>Sign in</AuthHeader>
      <SignInMenu />
    </LayoutSignInLayout>
  )
}
export default SignIn
const LayoutSignInLayout = styled.div`
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
