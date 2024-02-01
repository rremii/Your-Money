import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { resetEditCategory } from "@entities/Category/model/NewCategorySlice.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useCreateCategory } from "@entities/Category/model/useCreateCategory.tsx"
import { useEditCategory } from "@entities/Category/model/useEditCategory.tsx"
import { memo, useEffect } from "react"

export const EditCategoryHeader = () => {
  const dispatch = useAppDispatch()

  const menuType = useTypedSelector(state => state.UI.Modals.editCreateCategoryMenu.menuType)

  const { CreateCategory, isSuccess: isCreationSucceed } = useCreateCategory()
  const { EditCategory, isSuccess: isEditingSucceed } = useEditCategory()

  const CloseCategoryMenu = async () => {
    dispatch(closeMenu("editCreateCategoryMenu"))
    let timer: NodeJS.Timeout | null = null
    await new Promise((resolve) => {
      timer = setTimeout(() => {
        dispatch(resetEditCategory())
        resolve("")
      }, 500)
    })

    if (timer)
      return window.clearTimeout(timer)
  }

  useEffect(() => {
    if (isCreationSucceed || isEditingSucceed)
      dispatch(closeMenu("editCreateCategoryMenu"))
  }, [isCreationSucceed, isEditingSucceed])


  const OnConfirm = async () => {
    if (menuType === "create")
      await CreateCategory()
    if (menuType === "edit")
      await EditCategory()
  }


  return <HeaderLayout>
    {menuType === "create" && <img className="cancel" onClick={CloseCategoryMenu} src={Categories} alt="cancel" />}
    {menuType === "edit" && <img className="arrow" onClick={CloseCategoryMenu} src={Categories} alt="back" />}

    <h1 className="title">Category</h1>

    <img onClick={OnConfirm} className="confirm" src={Categories} alt="confirm" />
  </HeaderLayout>
}
const HeaderLayout = styled.header`
  height: 50px;
  display: flex;
  padding: 0 18px;
  align-items: center;

  .cancel, .confirm, .arrow {
    width: 17px;
    height: 17px;
    //background-color: red;
  }


  .title {
    margin-left: 30px;
    flex: 1 1 auto;
    color: var(--txt-1);
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`