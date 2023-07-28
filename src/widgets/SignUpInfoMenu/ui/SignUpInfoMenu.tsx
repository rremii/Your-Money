import styled from "styled-components"
import React from "react"
import { SignUpPasswordForm } from "@entities/Auth/ui/SignUpPasswordForm.tsx"
import { SignUpInfoForm } from "@entities/Auth/ui/SignUpInfoForm.tsx"

export const SignUpInfoMenu = () => {
  return (
    <SignUpPasswordLayout>
      <SignUpInfoForm />
    </SignUpPasswordLayout>
  )
}
const SignUpPasswordLayout = styled.main`
  width: 100%;
  padding: 25px 25px 0;
`
