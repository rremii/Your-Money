import styled from "styled-components"
import React from "react"
import { ORSeparator } from "@shared/ui/ORSeparator.tsx"
import { NoAccountLink } from "@shared/ui/NoAccountLink.tsx"
import { SignInForm } from "@entities/Auth"
import { GoogleAuth } from "@features/GoogleAuth/ui/GoogleAuth.tsx"
import { SignUpEmailForm } from "@entities/Auth/ui/SignUpEmailForm.tsx"
import { SignUpCodeForm } from "@entities/Auth/ui/SignUpCodeForm.tsx"
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
