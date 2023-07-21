import styled from "styled-components"
import React from "react"
import { SignUpPasswordForm } from "@entities/Auth/ui/SignUpPasswordForm.tsx"

export const SignUpPasswordMenu = () => {
  return (
    <SignUpPasswordLayout>
      <SignUpPasswordForm />
    </SignUpPasswordLayout>
  )
}
const SignUpPasswordLayout = styled.main`
  width: 100%;
  padding: 25px 25px 0;
`
