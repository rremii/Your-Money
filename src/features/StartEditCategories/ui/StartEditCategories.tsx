import styled from "styled-components"
import Categories from "/icons/general/categories.svg"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCategoriesEditMode } from "@entities/UI/model/PagesSlice.ts"
import EditIcon from "@icons/general/edit.svg?react"

export const StartEditCategories = () => {
  const dispatch = useAppDispatch()

  const SetEditCategoriesMode = () => {
    dispatch(setCategoriesEditMode(true))
  }

  return (
    <StartEditLayout onClick={SetEditCategoriesMode}>
      <EditIcon className="icon" />
    </StartEditLayout>
  )
}
const StartEditLayout = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;

    .icon {
        fill: white;
    }
`
