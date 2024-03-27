import styled from "styled-components"
import Categories from "../../../../public/icons/general/categories.png"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCategoriesEditMode } from "@entities/UI/model/PagesSlice.ts"

export const StartEditCategories = () => {
  const dispatch = useAppDispatch()

  const SetEditCategoriesMode = () => {
    dispatch(setCategoriesEditMode(true))
  }

  return (
    <StartEditLayout onClick={SetEditCategoriesMode}>
      <img src={Categories} alt="edit" />
    </StartEditLayout>
  )
}
const StartEditLayout = styled.button`
  width: 20px;
  height: 20px;
`
