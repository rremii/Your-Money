import styled from "styled-components"
import React from "react"
import { SignUpEmailForm } from "@entities/Auth/ui/SignUpEmailForm.tsx"

export const SignUpEmailMenu = () => {
  return (
    <SignUpEmailLayout>
      <SignUpEmailForm />
    </SignUpEmailLayout>
  )
}
const SignUpEmailLayout = styled.main`
  width: 100%;
  padding: 25px 25px 0;
`
