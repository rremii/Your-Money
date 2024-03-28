import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { resetEditCategory } from "@entities/Category/model/NewCategorySlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import React from "react"
import { CreateCategory } from "@features/CreateCategory/ui/CreateCategory.tsx"
import { EditCategory } from "@features/EditCategory/ui/EditCategory.tsx"
import { useTranslation } from "react-i18next"
import ArrowBack from "@icons/general/arrow-back.svg?react"


export const EditCategoryHeader = () => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateCategoryMenu.menuType
  )

  const { t } = useTranslation()

  const CloseCategoryMenu = async () => {
    dispatch(closeMenu("editCreateCategoryMenu"))
    let timer: NodeJS.Timeout | null = null
    await new Promise((resolve) => {
      timer = setTimeout(() => {
        dispatch(resetEditCategory())
        resolve("")
      }, 500)
    })

    if (timer) return window.clearTimeout(timer)
  }

  return (
    <HeaderLayout>
      <button className={"cancel"}
              onClick={CloseCategoryMenu}>
        <ArrowBack />
      </button>


      <h2 className="title">
        {menuType === "create"
          ? t("categoryMenu.title", { context: "create" })
          : t("categoryMenu.title", { context: "edit" })}
      </h2>

      {menuType === "create" ? <CreateCategory /> : <EditCategory />}
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header`
    height: 50px;
    display: flex;
    padding: 0 18px;
    align-items: center;

    .cancel,
    .CreateCategory,
    .EditCategory,
    .arrow {
        width: 25px;
        height: 25px;

        & * {
            fill: white;
        }
    }

    .title {
        margin-left: 30px;
        flex: 1 1 auto;
        color: #ffffff;
        font-family: Inter;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`
