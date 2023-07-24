import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useVerifyCodeMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTimer } from "@shared/hooks/useTimer.ts"

interface FormFields {
  code: string
}

const schema = yup
  .object()
  .shape({
    code: yup.string().length(6).required()
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
    reset, setFocus
  } = useForm<FormFields>({
    resolver: yupResolver(schema)
  })
  const { errors } = formState
  useEffect(() => {
    setFocus("code")
  }, [setFocus])

  const [verifyCode] = useVerifyCodeMutation()
  const { Reset: ResetTimer } = useTimer({ finalTime: 3, timeGap: 3, callback: clearErrors })


  const OnSubmit = async ({ code }: FormFields) => {
    if (code.length !== 6) return
    await verifyCode(code).unwrap().then(() => {
      navigate("/sign-up/password")
    }).catch(error => {
      reset()
      setError("code", { message: error.message })
      ResetTimer()
    })
  }

  const OnValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value
    if (code.length !== 6) return
    await OnSubmit({ code })
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
                onChange: OnValueChange
              })
            }
          }}
        />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </AuthForm>
    </SignUpFormLayout>
  )
}
const SignUpFormLayout = styled.div``
