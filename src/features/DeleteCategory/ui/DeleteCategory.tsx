import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteCategory } from "@entities/Category/model/useDeleteCategory.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useTranslation } from "react-i18next"
import DeleteIcon from "@icons/general/delete.svg?react"

export const DeleteCategory = () => {
  const dispatch = useAppDispatch()

  const categoryId = useTypedSelector((state) => state.NewCategory.id)

  const { DeleteCategory: deleteCategory, isLoading } = useDeleteCategory()
  const { t } = useTranslation()

  const OnClick = async () => {
    if (categoryId) {
      await deleteCategory(categoryId)
      dispatch(closeMenu("editCreateCategoryMenu"))
    }
  }

  return (
    <DeleteCategoryLayout disabled={isLoading} onClick={OnClick}>
      <DeleteIcon className="icon" />
      <p className="content">{t("categoryMenu.delete")}</p>
    </DeleteCategoryLayout>
  )
}
const DeleteCategoryLayout = styled.button`
    cursor: pointer;
    background-color: var(--sub-bg);
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    gap: 30px;
    box-shadow: 0 2px 5px 0 #0000003f;
    margin-top: 20px;
    width: 100%;

    .icon {
        fill: #ba4c4b;
        width: 25px !important;
    }

    .content {
        color: #ba4c4b;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`
