import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { resetEditCategory } from "@entities/Category/model/NewCategorySlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import React from "react"
import { CreateCategory } from "@features/CreateCategory/ui/CreateCategory.tsx"
import { EditCategory } from "@features/EditCategory/ui/EditCategory.tsx"

export const EditCategoryHeader = () => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateCategoryMenu.menuType,
  )

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
      {menuType === "create" && (
        <img
          className="cancel"
          onClick={CloseCategoryMenu}
          src={Categories}
          alt="cancel"
        />
      )}
      {menuType === "edit" && (
        <img
          className="arrow"
          onClick={CloseCategoryMenu}
          src={Categories}
          alt="back"
        />
      )}

      <h1 className="title">
        {menuType === "create" ? "New category" : "Category"}
      </h1>

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
    width: 17px;
    height: 17px;
    //background-color: red;
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
