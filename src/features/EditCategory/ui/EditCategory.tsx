import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useCreateCategory } from "@entities/Category/model/useCreateCategory.tsx"
import { useEditCategory } from "@entities/Category/model/useEditCategory.tsx"
import { useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const EditCategory = () => {
  const dispatch = useAppDispatch()

  const { EditCategory, isSuccess, isPending } = useEditCategory()

  useEffect(() => {
    if (!isPending && isSuccess) dispatch(closeMenu("editCreateCategoryMenu"))
  }, [dispatch, isPending, isSuccess])

  const Edit = async () => {
    await EditCategory()
  }

  return (
    <EditCategoryLayout
      disabled={isPending}
      onClick={Edit}
      className={"EditCategory"}
    >
      <img src={Categories} alt="edit" />
    </EditCategoryLayout>
  )
}
const EditCategoryLayout = styled.button`
  img {
    width: 100%;
    height: 100%;
  }
`
