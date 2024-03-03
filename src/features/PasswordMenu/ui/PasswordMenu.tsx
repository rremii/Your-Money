import { Modal } from "@shared/ui/Modal.tsx"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import styled from "styled-components"
import { GetMe, useChangePasswordMutation } from "@entities/User/api/UserApi.ts"
import { HashData } from "@shared/helpers/HashData.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { passwordSchema } from "@features/PasswordMenu/constants/validateSchema.ts"

interface FormFields {
  password: string
  confirmPassword: string
}

export const PasswordMenu = React.memo(() => {
  const dispatch = useAppDispatch()

  const isPasswordMenu = useTypedSelector(
    (state) => state.UI.Modals.passwordMenu.isOpen,
  )

  const { data: user } = GetMe.useQueryState()
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    reset,
    setError,
  } = useForm<FormFields>({
    resolver: yupResolver(passwordSchema),
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

  const ChangePassword = async ({ password, confirmPassword }: FormFields) => {
    if (isLoading || !user) return
    if (password === confirmPassword) {
      const hashedPassword = await HashData(password)

      changePassword({ id: user.id, hashedPassword })
        .unwrap()
        .then(() => {
          CloseMenu()
        })
        .catch((error) => SetError(error.message))
    } else {
      SetError("Passwords are not equal")
    }
  }

  const CloseMenu = () => {
    dispatch(closeMenu("passwordMenu"))
    reset()
  }
  //todo move form to other file
  return (
    <>
      <Overlay $isActive={isPasswordMenu} onClick={CloseMenu} $zIndex={15} />
      <PasswordLayout $isOpen={isPasswordMenu}>
        <h2 className="title">Change password</h2>
        <form onSubmit={handleSubmit(ChangePassword)}>
          <div className="fields">
            <FormField
              isError={Boolean(errors.root) || Boolean(errors.password)}
              label=""
              input={{
                type: "password",
                placeholder: "Password",
                registerData: { ...register("password") },
              }}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            <FormField
              isError={Boolean(errors.root || Boolean(errors.confirmPassword))}
              label=""
              input={{
                type: "password",
                placeholder: "Confirm password",
                registerData: { ...register("confirmPassword") },
              }}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
            {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
          </div>

          <div className="btn-section">
            <button className="gray" type="button" onClick={CloseMenu}>
              CANCEL
            </button>
            <button className="red" type="submit">
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </PasswordLayout>
    </>
  )
})
const PasswordLayout = styled(Modal)`
  .btn-section {
    margin-top: 20px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`
