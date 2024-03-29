import styled from "styled-components"
import React from "react"
import { SignInMenu } from "@widgets/SignInMenu/ui/SignInMenu.tsx"
import { SignInHeader } from "@widgets/Header/ui/SignInHeader.tsx"

const SignIn = () => {
  return (
    <LayoutSignInLayout>
      <SignInHeader />
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
