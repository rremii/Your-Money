import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import Categories from "@shared/assets/LightTheme/categories.png"
import { openMenu, setEditCategoryMenuType } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCreateCategory } from "@entities/Category/model/NewCategorySlice.ts"
import { GetRandomColor } from "@features/CategoryIconPickerModal/utils/GetRandomColor.ts"
import { GetRandomCategoryIcon } from "@features/CategoryIconPickerModal/utils/GetRandomCategoryIcon.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"

interface props {
  categoryType: TransactionType
}

export const StartCreatingCategory: FC<props> = ({ categoryType }) => {
  const dispatch = useAppDispatch()


  const { data: user } = GetMe.useQueryState()

  const CreateCategory = () => {
    if (!user) return
    dispatch(openMenu("editCreateCategoryMenu"))
    dispatch(setCreateCategory({
      color: GetRandomColor(),
      icon: GetRandomCategoryIcon(),
      type: categoryType,
      name: "",
      userId: user.id
    }))
    dispatch(setEditCategoryMenuType("create"))
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