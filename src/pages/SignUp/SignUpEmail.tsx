import styled from "styled-components"
import { AuthHeader } from "@widgets/AuthHeader"
import React from "react"
import { SignUpEmailMenu } from "@widgets/SignUpEmailMenu/ui/SignUpEmailMenu.tsx"
import { SignUpHeader } from "@widgets/Header/ui/SignUpHeader.tsx"

const SignUpEmail = () => {
  return (
    <LayoutSignUpLayout>
      <SignUpHeader />
      <SignUpEmailMenu />
    </LayoutSignUpLayout>
  )
}
export default SignUpEmail
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
