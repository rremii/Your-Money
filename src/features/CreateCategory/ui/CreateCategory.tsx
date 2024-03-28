import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useCreateCategory } from "@entities/Category/model/useCreateCategory.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import SubmitIcon from "@icons/general/done.svg?react"

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
      <SubmitIcon className="icon" />
    </CreateCategoryLayout>
  )
}
const CreateCategoryLayout = styled.button`
    .icon {
        fill: white;
        width: 25px !important;
        height: 25px !important;
    }
`
