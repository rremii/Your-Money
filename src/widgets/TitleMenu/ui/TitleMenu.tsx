import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { GetMe, useChangeNameMutation } from "@entities/User/api/UserApi.ts"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { closeAllMenus } from "@entities/SideBar/model/SideBarSlice.ts"
import * as yup from "yup"
import { setChangeTitleMenu, setTitle } from "@entities/CurTransaction/model/CurTransactionSlice.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"

interface FormFields {
  title: string | undefined
}

const schema = yup
  .object()
  .shape({
    title: yup.string().max(20)
  })


export const TitleMenu = () => {
  const dispatch = useAppDispatch()

  const initTitle = useTypedSelector(state => state.CurTransaction.title)
  const isMenuOpen = useTypedSelector(state => state.CurTransaction.isChangeTitleMenu)


  const { register, formState, handleSubmit, reset } =
    useForm<FormFields>({
      resolver: yupResolver(schema),
      values: {
        title: initTitle || ""
      }
    })
  const { errors } = formState


  const ChangeTitle = ({ title }: FormFields) => {
    dispatch(setTitle(title || ""))
    dispatch(setChangeTitleMenu(false))
    reset()
  }

  const CloseMenu = () => {
    dispatch(setChangeTitleMenu(false))
    reset()
  }

  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <TitleMenuLayout $isOpen={isMenuOpen}>
      <h2 className="title">Notes</h2>
      <form onSubmit={handleSubmit(ChangeTitle)}>
        <div className="fields">

          <FormField
            isError={Boolean(errors.root) || Boolean(errors.title)}
            label=""
            input={{
              type: "text",
              placeholder: "Comments...",
              registerData: { ...register("title") }
            }}
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}

        </div>

        <div className="btn-section">
          <button className="gray" type="button" onClick={CloseMenu}>CANCEL</button>
          <button className="gray" type="submit">OK</button>
        </div>
      </form>
    </TitleMenuLayout>
  </>
}
const TitleMenuLayout = styled(Modal)`

  z-index: 50;

  .ErrorMessage {
    margin-top: 10px;
  }

  .btn-section {
    margin-top: 10px;
  }

  .title {
    margin-bottom: 10px;
  }

`