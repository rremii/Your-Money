import styled from "styled-components"
import React from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import { setNewAccountName } from "@entities/Account/model/NewAccountSlice.ts"
import { nameValidateSchema } from "@widgets/EditCreateAccountMenu/constants/NameValidateSchema.ts"
import { useTranslation } from "react-i18next"

interface FormFields {
  name: string
}

export const NameInput = () => {
  const dispatch = useAppDispatch()

  const name = useTypedSelector((state) => state.NewAccount.name)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormFields>({
    resolver: yupResolver(nameValidateSchema),
    values: {
      name,
    },
  })
  const { t } = useTranslation()

  const ChangeAccountName = (newName: string) => {
    if (isValid) dispatch(setNewAccountName(newName))
  }

  const HandleChange = ({ name }: FormFields) => {
    ChangeAccountName(name)
  }

  return (
    <NameInputLayout>
      <form
        onSubmit={handleSubmit(HandleChange)}
        onChange={handleSubmit(HandleChange)}
      >
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.name)}
          label={t("accountMenu.name")}
          input={{
            type: "text",
            placeholder: "",
            registerData: { ...register("name") },
          }}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </form>
    </NameInputLayout>
  )
}
const NameInputLayout = styled.div`
  padding: 0 66px;

  .label {
    color: rgba(255, 255, 255, 0.53);
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }

  .ErrorMessage {
    color: white;
  }

  .FormField {
    margin-bottom: 5px;
    width: 100%;
    background-color: transparent;

    label {
      color: rgba(255, 255, 255, 0.52) !important;
    }

    input {
      color: #ffffff !important;
      font-family: Inter;
      font-size: 21px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-bottom: 1px solid white;
    }
  }
`
