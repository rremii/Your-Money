import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useLoginMutation } from "@entities/Auth/api/AuthApi.ts"
import { useNavigate } from "react-router-dom"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setAuthSuccess } from "@entities/Auth/model/AuthSlice.ts"
import { signInSchema } from "@entities/Auth/constants/SignInValidateSchemas.ts"

interface FormFields {
  email: string
  password: string
}

export const SignInForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const { register, clearErrors, setError, formState, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(signInSchema),
    })
  const { errors } = formState

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
  const OnSubmit = async (authData: FormFields) => {
    await login(authData)
      .unwrap()
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken)
        dispatch(setAuthSuccess())
        navigate("/categories")
      })
      .catch((error) => SetError(error.message))
  }
  return (
    <SignInFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.email)}
          label="Email"
          input={{
            type: "email",
            placeholder: "abc@gmail.com",
            registerData: { ...register("email") },
          }}
        />
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.password)}
          label="Password"
          input={{
            type: "password",
            placeholder: "1234",
            registerData: { ...register("password") },
          }}
        />
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <AuthSubmitBtn>CONTINUE</AuthSubmitBtn>
      </AuthForm>
    </SignInFormLayout>
  )
}
const SignInFormLayout = styled.div``
