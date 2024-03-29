import styled from "styled-components"
import React from "react"
import { SignUpCodeForm } from "@entities/Auth/ui/SignUpCodeForm.tsx"
import { ResendAuthCode } from "@features/ResendAuthCode/ui/ResendAuthCode.tsx"

export const SignUpCodeMenu = () => {
  return (
    <SignUpCodeLayout>
      <SignUpCodeForm />
      <ResendAuthCode />
    </SignUpCodeLayout>
  )
}
const SignUpCodeLayout = styled.main`
  width: 100%;
  padding: 25px 25px 0;
  background-color: var(--main-bg);
`
