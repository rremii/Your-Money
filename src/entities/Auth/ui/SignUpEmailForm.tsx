import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React from "react"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"

interface FormFields {
  email: string
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Email is required")
  })
  .required()

export const SignUpEmailForm = () => {
  const navigate = useNavigate()
  const { register, formState, clearErrors, setError, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(schema)
    })
  const { errors } = formState
  const OnSubmit = (data: FormFields) => {
    data
    navigate("/sign-up/code")
    // if (true) {
    //   setError("email", { message: "some api error" })
    // todo fix
    // const timer = setTimeout(() => {
    //   clearErrors()
    // }, 5000)
    // } else {
    // }
  }
  return (
    <SignUpFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <FormField
          label="Email"
          isError={Boolean(errors.email)}
          input={{
            type: "email",
            placeholder: "abc@gmail.com",
            registerData: { ...register("email") }
          }}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <AuthSubmitBtn>CONTINUE</AuthSubmitBtn>
      </AuthForm>
    </SignUpFormLayout>
  )
}
const SignUpFormLayout = styled.div``
