import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useRegisterMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTimer } from "@shared/hooks/useTimer.ts"
import { useRef, useState } from "react"
import Categories from "@shared/assets/LightTheme/categories.png"
import { setUserInfo } from "@entities/Auth/model/AuthSlice.ts"
import { useImage } from "@shared/hooks/useImage.tsx"

interface FormFields {
  name: string
}

//todo limit all fields by length && img size
//todo move all the schemas to separated file
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required")
  })
  .required()


export const SignUpInfoForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { register, formState, handleSubmit } =
    useForm<FormFields>({
      resolver: yupResolver(schema)
    })
  const { errors } = formState


  const { SetImage, curImage: curAvatar, imgRef } = useImage()


  const OnSubmit = ({ name }: FormFields) => {
    dispatch(setUserInfo({ name, avatar: curAvatar }))
    navigate("/sign-up/password")
  }
  return (
    <SignUpFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <div className="avatar">
          <input onChange={SetImage} accept="image/*" ref={imgRef} type="file" />
          <img src={curAvatar || Categories} alt="" />
        </div>
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.name)}
          label="Name"
          input={{
            type: "text",
            placeholder: "",
            registerData: { ...register("name") }
          }}
        />
        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        <AuthSubmitBtn>CONTINUE</AuthSubmitBtn>
      </AuthForm>
    </SignUpFormLayout>
  )
}
const SignUpFormLayout = styled.div`



  .avatar {
    align-self: center;
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    //background-color: grey;

    img {
      width: 100%;
      height: 100%;
    }

    input {
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: red;
      width: 100%;
      height: 100%;
    }

    input[type="file"]::-webkit-file-upload-button {
      display: none;
    }

  }

  .AuthSubmitBtn {
    width: 150px;
    height: 35px;
  }
`
