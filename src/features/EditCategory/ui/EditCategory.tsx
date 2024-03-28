import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useEditCategory } from "@entities/Category/model/useEditCategory.tsx"
import { useEffect } from "react"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import SubmitIcon from "@icons/general/done.svg?react"

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
      <SubmitIcon className="icon" />
    </EditCategoryLayout>
  )
}
const EditCategoryLayout = styled.button`
    .icon {
        fill: white;
        width: 25px !important;
        height: 25px !important;
    }
`
