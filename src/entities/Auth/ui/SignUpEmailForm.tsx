import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useConfirmEmailMutation } from "@entities/Auth/api/AuthApi.ts"
import * as timers from "timers"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setEmail } from "@entities/Auth/model/AuthSlice.ts"

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { register, formState, clearErrors, setError, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(schema),
      values: { email: "noruto2021@gmail.com" }
    })
  const { errors } = formState

  const [confirmEmail] = useConfirmEmailMutation()


  const OnSubmit = async ({ email }: FormFields) => {
    await confirmEmail(email).unwrap().then(() => {
      dispatch(setEmail(email))
      navigate("/sign-up/code")
    }).catch(error => {
      setError("email", { message: error?.message })
      //todo fix
      setTimeout(() => {
        clearErrors()
      }, 2000)
    })
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
