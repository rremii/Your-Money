import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import AccountCategoryIconComp from "@shared/assets/AccountCategoryIconComp.tsx"

export const CreateCategoryIcon = () => {
  const dispatch = useAppDispatch()

  const icon = useTypedSelector((state) => state.NewCategory.icon)
  const color = useTypedSelector((state) => state.NewCategory.color)

  const OpenCreateCategoryMenu = () => {
    dispatch(openMenu("categoryIconPickerMenu"))
  }

  return (
    <IconLayout onClick={OpenCreateCategoryMenu}>
      {AccountCategoryIconComp.get(icon, { fill: color })}
    </IconLayout>
  )
}
const IconLayout = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100%;
  right: 10px;
  background-color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  transform: translateY(-50%);
  box-shadow: 0 1px 5px -1px #0000003f;

  svg {
    width: 25px;
    height: 25px;
  }
`
