import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteCategoryMutation } from "@entities/Category/api/CategoriesApi.ts"
import { useDeleteCategory } from "@entities/Category/model/useDeleteCategory.tsx"

export const DeleteCategory = () => {
  const categoryId = useTypedSelector(state => state.NewCategory.id)

  const { DeleteCategory: deleteCategory } = useDeleteCategory()

  const OnClick = async () => {
    if (categoryId)
      await deleteCategory(categoryId)
  }

  return <DeleteCategoryLayout onClick={OnClick}>
    <img src={Categories} alt="delete icon" className="icon" />
    <p className="content">Delete category</p>
  </DeleteCategoryLayout>
}
const DeleteCategoryLayout = styled.div`
  cursor: pointer;
  background-color: var(--bg-1);
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 30px;
  box-shadow: 0 2px 5px 0 var(--shadow-3);

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