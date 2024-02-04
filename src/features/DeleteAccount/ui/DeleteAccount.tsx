import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDeleteCategory } from "@entities/Category/model/useDeleteCategory.tsx"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"

export const DeleteAccount = () => {
  const dispatch = useAppDispatch()

  const id = useTypedSelector(state => state.NewAccount.id)

  // const { DeleteCategory: deleteCategory } = useDeleteCategory()

  const OnClick = () => {
    if (id) {
      // await deleteCategory(id)
      dispatch(closeMenu("editCreateAccountMenu"))
    }
  }

  return <DeleteCategoryLayout onClick={OnClick}>
    <img src={Categories} alt="delete icon" className="icon" />
    <p className="content">Delete account</p>
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