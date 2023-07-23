import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRegisterMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTimer } from "@shared/hooks/useTimer.ts"

interface FormFields {
  password: string
  confirmPassword: string
}

const schema = yup
  .object()
  .shape({
    password: yup.string().required("field is required"),
    confirmPassword: yup.string().required("field is required")
  })
  .required()


export const SignUpPasswordForm = () => {
  const navigate = useNavigate()

  const email = useTypedSelector(state => state.Auth.email)

  const [registerUser] = useRegisterMutation()


  const { register, formState, clearErrors, handleSubmit, reset, setError } =
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

  const OnSubmit = async ({ password, confirmPassword }: FormFields) => {
    if (password !== confirmPassword) SetError("Passwords are not equal")
    if (password === confirmPassword) {
      await registerUser({ password, email }).unwrap().then((res) => {
        localStorage.setItem("accessToken", res.accessToken)
        navigate("/categories")
      }).catch(error => SetError(error.message))
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
            registerData: { ...register("password") }
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
            registerData: { ...register("confirmPassword") }
          }}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        <AuthSubmitBtn>SUBMIT</AuthSubmitBtn>
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
