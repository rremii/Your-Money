import styled from "styled-components"
import { AuthHeader } from "@widgets/AuthHeader"
import React from "react"
import { SignUpCodeMenu } from "@widgets/SignUpCodeMenu/ui/SignUpCodeMenu.tsx"
import { SignUpHeader } from "@widgets/Header/ui/SignUpHeader.tsx"

const SignUpCode = () => {
  return (
    <LayoutSignUpLayout>
      <SignUpHeader />
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
  background-color: white;
  //overflow-x: hidden;

  main {
    flex: 1 1 auto;
  }
`
