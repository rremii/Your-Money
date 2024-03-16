import styled from "styled-components"
import React from "react"
import { SignUpPasswordMenu } from "@widgets/SignUpPasswordMenu/ui/SignUpPasswordMenu.tsx"
import { SignUpHeader } from "@widgets/Header/ui/SignUpHeader.tsx"

const SignUpPassword = () => {
  return (
    <LayoutSignUpLayout>
      <SignUpHeader />
      <SignUpPasswordMenu />
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
