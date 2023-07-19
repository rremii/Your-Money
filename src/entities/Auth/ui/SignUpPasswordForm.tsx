import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"

interface FormFields {
  password: string
  confirmPassword: string
}

const schema = yup
  .object()
  .shape({
    password: yup.string().required("field is required"),
    confirmPassword: yup.string().required("field is required"),
  })
  .required()

export const SignUpPasswordForm = () => {
  const navigate = useNavigate()
  const { register, formState, clearErrors, handleSubmit, reset, setError } =
    useForm<FormFields>({
      resolver: yupResolver(schema),
    })
  const { errors } = formState

  const OnSubmit = ({ password, confirmPassword }: FormFields) => {
    if (password !== confirmPassword) {
      setError("root", { message: "Password are not equal" })

      //todo fix
      const timer = setTimeout(() => {
        clearErrors()
      }, 5000)
    } else {
      reset()
      navigate("/categories")
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
