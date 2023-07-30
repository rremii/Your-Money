import { SideBarModal } from "@shared/ui/SideBarModal.tsx"
import React from "react"
import { setIsSideBar } from "@entities/SideBar"
import { setAuthInitial, setAuthSuccess } from "@entities/Auth/model/AuthSlice.ts"
import { closeAllMenus } from "@entities/SideBar/model/SideBarSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTimer } from "@shared/hooks/useTimer.ts"
import * as yup from "yup"
import styled from "styled-components"
import { GetMe, useChangeNameMutation, useGetMeQuery } from "@entities/User/api/UserApi.ts"


interface FormFields {
  name: string
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required("field is required")
  })
  .required()


//todo set auto focus to all fields necessary
export const NameMenu = () => {
  const dispatch = useAppDispatch()


  const isNameMenu = useTypedSelector(state => state.SideBar.isNameMenu)

  const { data: user } = GetMe.useQueryState()
  const [changeName, { isLoading }] = useChangeNameMutation()

  const { register, formState, clearErrors, handleSubmit, reset, setError } =
    useForm<FormFields>({
      resolver: yupResolver(schema),
      values: {
        name: user ? user.name : ""
      }
    })
  const { errors } = formState
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
    dispatch(closeAllMenus())
    reset()
  }

  return <NameLayout $isOpen={isNameMenu}>
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
}
const NameLayout = styled(SideBarModal)`
  .btn-section {
    margin-top: 20px;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`