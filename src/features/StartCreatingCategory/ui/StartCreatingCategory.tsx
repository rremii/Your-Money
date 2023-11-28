import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import Categories from "@shared/assets/LightTheme/categories.png"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setNewCategoryColor, setNewCategoryType } from "@entities/Category/model/NewCategorySlice.ts"
import { GetRandomColor } from "@features/CategoryIconPickerModal/utils/GetRandomColor.ts"

interface props {
  categoryType: TransactionType
}

export const StartCreatingCategory: FC<props> = ({ categoryType }) => {
  const dispatch = useAppDispatch()

  const CreateCategory = () => {
    dispatch(openMenu("editCreateCategoryMenu"))
    dispatch(setNewCategoryType(categoryType))
    dispatch(setNewCategoryColor(GetRandomColor()))
  }

  return <CreatingCategoryLayout onClick={CreateCategory}>
    <div className="icon">
      <img src={Categories} alt="create category" />
    </div>
  </CreatingCategoryLayout>
}
const CreatingCategoryLayout = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
  }
`