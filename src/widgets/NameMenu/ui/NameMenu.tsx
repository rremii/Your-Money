import { Modal } from "@shared/ui/Modal.tsx"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import * as yup from "yup"
import styled from "styled-components"
import { GetMe, useChangeNameMutation } from "@entities/User/api/UserApi.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { closeMenu } from "@entities/Modals/model/ModalsSlice.ts"
import { nameValidateSchema } from "@widgets/NameMenu/constants/NameValidateSchema.ts"


interface FormFields {
  name: string
}


export const NameMenu = React.memo(() => {
  const dispatch = useAppDispatch()


  const isNameMenu = useTypedSelector(state => state.Modals.nameMenu.isOpen)

  const { data: user } = GetMe.useQueryState()
  const [changeName, { isLoading }] = useChangeNameMutation()

  const { register, formState: { errors }, clearErrors, handleSubmit, reset, setError } =
    useForm<FormFields>({
      resolver: yupResolver(nameValidateSchema),
      values: {
        name: user ? user.name : ""
      }
    })

  const { Reset: ResetTimer } = useTimer({ timeGap: 3, finalTime: 3, callback: clearErrors })


  const SetError = (message: string) => {
    reset()
    setError("name", { message })
    ResetTimer()
  }

  const ChangeName = ({ name }: FormFields) => {
    if (isLoading || !user) return
    changeName({ id: user.id, newName: name }).unwrap().then(() => {
      CloseMenu()
    }).catch(error => SetError(error.message))
  }

  const CloseMenu = () => {
    dispatch(closeMenu("nameMenu"))
    reset()
  }

  return <>
    <Overlay $isActive={isNameMenu} onClick={CloseMenu} $zIndex={15} />
    <NameLayout $isOpen={isNameMenu}>
      <h2 className="title">Change name</h2>
      <form onSubmit={handleSubmit(ChangeName)}>
        <div className="fields">

          <FormField
            isError={Boolean(errors.root) || Boolean(errors.name)}
            label=""
            input={{
              type: "text",
              placeholder: "Name",
              registerData: { ...register("name") }
            }}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}

        </div>

        <div className="btn-section">
          <button className="gray" type="button" onClick={CloseMenu}>CANCEL</button>
          <button className="red" type="submit">CHANGE</button>
        </div>
      </form>
    </NameLayout>
  </>
})
const NameLayout = styled(Modal)`
  .btn-section {
    margin-top: 20px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`