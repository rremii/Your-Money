import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React from "react"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"

interface FormFields {
  code: string
}

const schema = yup
  .object()
  .shape({
    code: yup.string().length(6).required(),
  })
  .required()

export const SignUpCodeForm = () => {
  const navigate = useNavigate()
  const {
    register,
    formState,
    clearErrors,
    setError,
    handleSubmit,
    reset,
    trigger,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  })
  const { errors } = formState

  const OnSubmit = (data: FormFields) => {
    data
    reset()
    navigate("/sign-up/password")
    // debugger
    // if (true) {
    //   setError("code", { message: "some api error" })
    // todo fix
    // const timer = setTimeout(() => {
    //   clearErrors()
    // }, 5000)
    // } else {
    // }
  }

  const OnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value
    if (code.length !== 6) return
    OnSubmit({ code })
  }

  return (
    <SignUpFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <FormField
          isError={Boolean(errors.code)}
          label="Code"
          input={{
            type: "text",
            placeholder: "",
            registerData: {
              ...register("code", {
                onChange: OnValueChange,
              }),
            },
          }}
        />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </AuthForm>
    </SignUpFormLayout>
  )
}
const SignUpFormLayout = styled.div``
