import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useLoginMutation } from "@entities/Auth/api/AuthApi.ts"
import { useNavigate } from "react-router-dom"
import { useTimer } from "@shared/hooks/useTimer.ts"

interface FormFields {
  email: string
  password: string
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

export const SignInForm = () => {
  const navigate = useNavigate()

  const [login] = useLoginMutation()


  const { register, clearErrors, setError, formState, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(schema)
    })
  const { errors } = formState


  const { Reset: ResetTimer } = useTimer(3, 3, clearErrors)


  const SetError = (message: string) => {
    reset()
    setError("root", { message })
    ResetTimer()
  }
  const OnSubmit = async (authData: FormFields) => {
    await login(authData).unwrap().then((res) => {
      localStorage.setItem("accessToken", res.accessToken)
      navigate("/categories")
    }).catch(error => SetError(error.message))
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
            registerData: { ...register("email") }
          }}
        />
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.password)}
          label="Password"
          input={{
            type: "password",
            placeholder: "1234",
            registerData: { ...register("password") }
          }}
        />
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <AuthSubmitBtn>CONTINUE</AuthSubmitBtn>
      </AuthForm>
    </SignInFormLayout>
  )
}
const SignInFormLayout = styled.div``
