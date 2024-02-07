import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useCreateCategory } from "@entities/Category/model/useCreateCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

export const CreateCategory = () => {
  const dispatch = useAppDispatch()

  const { data: user } = GetMe.useQueryState()
  const { CreateCategory, isSuccess, isPending } = useCreateCategory(user?.id)

  useEffect(() => {
    if (!isPending && isSuccess) dispatch(closeMenu("editCreateCategoryMenu"))
  }, [dispatch, isPending, isSuccess])

  const Create = async () => {
    await CreateCategory()
  }

  return (
    <CreateCategoryLayout
      disabled={isPending}
      onClick={Create}
      className={"CreateCategory"}
    >
      <img src={Categories} alt="create" />
    </CreateCategoryLayout>
  )
}
const CreateCategoryLayout = styled.button`
  img {
    width: 100%;
    height: 100%;
  }
`
