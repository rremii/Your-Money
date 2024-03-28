import { AuthForm } from "@shared/ui/AuthForm.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { AuthSubmitBtn } from "@shared/ui/AuthSubmitBtn.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import Categories from "/icons/general/categories.svg"
import { setUserInfo } from "@entities/Auth/model/AuthSlice.ts"
import { useImage } from "@shared/hooks/useImage.tsx"
import { infoFormSchema } from "@entities/Auth/constants/SignUpValidateSchemas.ts"
import { useTranslation } from "react-i18next"
import DefaultAvatar from "@icons/general/avatar.svg?react"

interface FormFields {
  name: string
}

export const SignUpInfoForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormFields>({
    resolver: yupResolver(infoFormSchema)
  })

  const [t] = useTranslation()

  const { SetImage, curImage: curAvatar, imgRef } = useImage()

  const OnSubmit = ({ name }: FormFields) => {
    dispatch(setUserInfo({ name, avatar: curAvatar }))
    navigate("/sign-up/password")
  }
  return (
    <SignUpFormLayout>
      <AuthForm OnSubmit={handleSubmit(OnSubmit)}>
        <div className="avatar">
          <input
            onChange={SetImage}
            accept="image/*"
            ref={imgRef}
            type="file"
          />
          {curAvatar ? <img src={curAvatar || ""} alt="avatar" />
            : <DefaultAvatar />}
        </div>
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.name)}
          label={t("signUpInfoMenu.name")}
          input={{
            type: "text",
            placeholder: "",
            registerData: { ...register("name") }
          }}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <AuthSubmitBtn>
          {t("signUpInfoMenu.submit").toUpperCase()}
        </AuthSubmitBtn>
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
