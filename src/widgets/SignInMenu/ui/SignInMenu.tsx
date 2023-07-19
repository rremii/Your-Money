import styled from "styled-components"
import React from "react"
import { NavLink } from "react-router-dom"
import Google from "@shared/assets/LightTheme/google.svg"
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
  width: 100%;
  padding: 25px 25px 0;
`
