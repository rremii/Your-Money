import styled from "styled-components"
import React, { FC } from "react"

interface props {
  children: React.ReactNode
  OnSubmit: () => void
}

export const AuthForm: FC<props> = ({ children, OnSubmit }) => {
  return (
    <AuthFormLayout autoComplete="off" onSubmit={OnSubmit}>
      {children}
    </AuthFormLayout>
  )
}

const AuthFormLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  gap: 15px;
`
