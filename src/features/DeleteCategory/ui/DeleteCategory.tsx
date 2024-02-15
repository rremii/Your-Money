import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteCategory } from "@entities/Category/model/useDeleteCategory.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"

export const DeleteCategory = () => {
  const dispatch = useAppDispatch()

  const categoryId = useTypedSelector((state) => state.NewCategory.id)

  const { DeleteCategory: deleteCategory, isLoading } = useDeleteCategory()

  const OnClick = async () => {
    if (categoryId) {
      await deleteCategory(categoryId)
      dispatch(closeMenu("editCreateCategoryMenu"))
    }
  }

  return (
    <DeleteCategoryLayout disabled={isLoading} onClick={OnClick}>
      <img src={Categories} alt="delete icon" className="icon" />
      <p className="content">Delete category</p>
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
  box-shadow: 0 2px 5px 0 var(--shadow-3);
  margin-top: 20px;
  width: 100%;

  .icon {
    width: 15px;
  }

  .content {
    color: var(--txt-7);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
