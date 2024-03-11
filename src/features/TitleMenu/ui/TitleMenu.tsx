import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { ErrorMessage } from "@shared/ui/ErrorMessage.tsx"
import React, { memo } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { setEditTransTitle } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { titleValidateSchema } from "@features/TitleMenu/constants/TitleValidateSchema.ts"
import { useTranslation } from "react-i18next"

interface FormFields {
  title: string | undefined
}

export const TitleMenu = memo(() => {
  const dispatch = useAppDispatch()

  const initTitle = useTypedSelector(
    (state) => state.EditCreateTransaction.Transaction.title,
  )
  const isMenuOpen = useTypedSelector(
    (state) => state.UI.Modals.titleMenu.isOpen,
  )

  const { t } = useTranslation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(titleValidateSchema),
    values: {
      title: initTitle || "",
    },
  })

  const ChangeTitle = ({ title }: FormFields) => {
    dispatch(setEditTransTitle(title || ""))
    dispatch(closeMenu("titleMenu"))
    reset()
  }

  const CloseMenu = () => {
    dispatch(closeMenu("titleMenu"))
    reset()
  }

  return (
    <>
      <Overlay
        onClick={CloseMenu}
        $isActive={isMenuOpen}
        $zIndex={50}
        $color={"rgba(0, 0, 0, 0.5 )"}
      />
      <TitleMenuLayout $isOpen={isMenuOpen}>
        <h2 className="title">{t("titleMenu.title")}</h2>
        <form onSubmit={handleSubmit(ChangeTitle)}>
          <div className="fields">
            <FormField
              isError={Boolean(errors.root) || Boolean(errors.title)}
              label=""
              input={{
                type: "text",
                placeholder: t("titleMenu.placeholder"),
                registerData: { ...register("title") },
              }}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </div>

          <div className="btn-section">
            <button className="gray" type="button" onClick={CloseMenu}>
              {t("general.buttons.cancel").toUpperCase()}
            </button>
            <button className="gray" type="submit">
              {t("general.buttons.ok")}
            </button>
          </div>
        </form>
      </TitleMenuLayout>
    </>
  )
})
const TitleMenuLayout = styled(Modal)`
  z-index: 50;
  padding-bottom: 15px;

  .ErrorMessage {
    margin-top: 10px;
  }

  .btn-section {
    margin-top: 20px;
  }

  .title {
    margin-bottom: 10px;
  }
`
