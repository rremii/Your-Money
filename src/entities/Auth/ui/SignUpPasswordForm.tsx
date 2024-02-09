import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRegisterMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { ConvertURLtoFile } from "@shared/helpers/ConvertURLtoFile.ts"
import { setAuthSuccess } from "@entities/Auth/model/AuthSlice.ts"
import { passwordFormSchema } from "@entities/Auth/constants/SignUpValidateSchemas.ts"

interface FormFields {
  password: string
  confirmPassword: string
}

export const SignUpPasswordForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const email = useTypedSelector((state) => state.Auth.email)
  const avatar = useTypedSelector((state) => state.Auth.avatar)
  const name = useTypedSelector((state) => state.Auth.name)

  const [registerUser, { isLoading }] = useRegisterMutation()

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    reset,
    setError,
  } = useForm<FormFields>({
    resolver: yupResolver(passwordFormSchema),
  })

  const { Reset: ResetTimer } = useTimer({
    timeGap: 3,
    finalTime: 3,
    callback: clearErrors,
  })

  const SetError = (message: string) => {
    reset()
    setError("root", { message })
    ResetTimer()
  }

  const OnSubmit = async ({ password, confirmPassword }: FormFields) => {
    if (isLoading) return
    if (password === confirmPassword) {
      const formData = new FormData()

      if (avatar) {
        const avatarImg = await ConvertURLtoFile(avatar)
        formData.append("avatar", avatarImg)
      }

      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)

      await registerUser(formData)
        .unwrap()
        .then((res) => {
          localStorage.setItem("accessToken", res.accessToken)
          dispatch(setAuthSuccess())
          navigate("/categories")
        })
        .catch((error) => SetError(error.message))
    } else {
      SetError("Passwords are not equal")
    }
  }
  return (
    <SignUpFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.password)}
          label="Password"
          input={{
            type: "password",
            placeholder: "1234",
            registerData: { ...register("password") },
          }}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <FormField
          isError={Boolean(errors.root || Boolean(errors.confirmPassword))}
          label="Confirm password"
          input={{
            type: "password",
            placeholder: "1234",
            registerData: { ...register("confirmPassword") },
          }}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <AuthSubmitBtn isLoading={isLoading}>SUBMIT</AuthSubmitBtn>
      </AuthForm>
    </SignUpFormLayout>
  )
}
const SignUpFormLayout = styled.div`
  .AuthSubmitBtn {
    width: 150px;
    height: 35px;
  }
`
