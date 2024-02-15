import styled from "styled-components"
import React from "react"
import { ORSeparator } from "@shared/ui/ORSeparator.tsx"
import { NoAccountLink } from "@shared/ui/NoAccountLink.tsx"
import { SignInForm } from "@entities/Auth"
import { GoogleAuth } from "@features/GoogleAuth/ui/GoogleAuth.tsx"

export const SignInMenu = () => {
  return (
    <SignInMenuLayout>
      <SignInForm />
      <ORSeparator />
      <GoogleAuth />
      <NoAccountLink />
    </SignInMenuLayout>
  )
}
const SignInMenuLayout = styled.main`
  background-color: var(--main-bg);
  width: 100%;
  padding: 25px 25px 0;
`
