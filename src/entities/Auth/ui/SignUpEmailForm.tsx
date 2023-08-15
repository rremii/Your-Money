import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useConfirmEmailMutation } from "@entities/Auth/api/AuthApi.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setEmail } from "@entities/Auth/model/AuthSlice.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { emailFormSchema } from "@entities/Auth/constants/SignUpValidateSchemas.ts"

interface FormFields {
  email: string
}


export const SignUpEmailForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { register, setFocus, formState, clearErrors, setError, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(emailFormSchema),
      values: { email: "noruto2021@gmail.com" }
    })
  const { errors } = formState
  useEffect(() => {
    setFocus("email")
  }, [setFocus])


  const { Reset: ResetTimer } = useTimer({ timeGap: 3, finalTime: 3, callback: clearErrors })

  const [confirmEmail, { isLoading }] = useConfirmEmailMutation()


  const OnSubmit = async ({ email }: FormFields) => {
    if (isLoading) return
    await confirmEmail(email).unwrap().then(() => {
      dispatch(setEmail(email))
      navigate("/sign-up/code")
    }).catch(error => {
      setError("email", { message: error?.message })
      ResetTimer()
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
