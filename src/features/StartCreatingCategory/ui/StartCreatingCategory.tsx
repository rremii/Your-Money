import styled from "styled-components"
import { TransactionType } from "@entities/Transaction/types.ts"
import { FC } from "react"
import Categories from "/icons/general/categories.svg"
import {
  openMenu,
  setEditCategoryMenuType
} from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { setCreateCategory } from "@entities/Category/model/NewCategorySlice.ts"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { GetRandomColor } from "@shared/modules/IconColorPicker/utils/GetRandomColor.ts"
import { GetRandomCategoryIcon } from "@shared/modules/IconColorPicker/utils/GetRandomCategoryIcon.ts"
import Plus from "@icons/general/add.svg?react"

interface props {
  categoryType: TransactionType
}

export const StartCreatingCategory: FC<props> = ({ categoryType }) => {
  const dispatch = useAppDispatch()

  const { data: user } = GetMe.useQueryState()

  const CreateCategory = () => {
    if (!user) return
    dispatch(openMenu("editCreateCategoryMenu"))
    dispatch(
      setCreateCategory({
        color: GetRandomColor(),
        icon: GetRandomCategoryIcon(),
        type: categoryType,
        name: "",
        userId: user.id
      })
    )
    dispatch(setEditCategoryMenuType("create"))
  }

  return (
    <CreatingCategoryLayout onClick={CreateCategory}>
      <div className="icon">
        <Plus />
      </div>
    </CreatingCategoryLayout>
  )
}
const CreatingCategoryLayout = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-flex;

    background-color: var(--main-bg);

    border: 1px rgba(114, 114, 114, 0.41) dashed;

    .icon {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            fill: rgba(128, 126, 126, 0.56);
        }
    }
`
