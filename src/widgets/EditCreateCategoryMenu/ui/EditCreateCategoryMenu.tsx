import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { EditCategoryHeader } from "@widgets/EditCreateCategoryMenu/ui/EditCategoryHeader.tsx"
import { DeleteCategory } from "@features/DeleteCategory/ui/DeleteCategory.tsx"
import { NameInput } from "@widgets/EditCreateCategoryMenu/ui/NameInput.tsx"
import { CreateCategoryIcon } from "@features/CreateCategoryIcon/ui/CreateCategoryIcon.tsx"

export const EditCreateCategoryMenu = () => {

  const isMenuOpen = useTypedSelector(state => state.UI.Modals.editCreateCategoryMenu.isOpen)
  const menuType = useTypedSelector(state => state.UI.Modals.editCreateCategoryMenu.menuType)
  const newCategory = useTypedSelector(state => state.NewCategory)


  return <EditCreateCategoryLayout $color={newCategory.color} $isMenuOpen={isMenuOpen}>
    <div className="colorfull-box">
      <EditCategoryHeader />
      <NameInput />
      <CreateCategoryIcon />
    </div>

    {menuType === "edit" && (
      <DeleteCategory />
    )}
  </EditCreateCategoryLayout>
}
const EditCreateCategoryLayout = styled.div<{
  $isMenuOpen?: boolean
  $color?: string
}>`
  position: absolute;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  max-width: 450px;
  top: 0;
  left: 0;
  transition: transform .5s;
  pointer-events: ${({ $isMenuOpen }) => $isMenuOpen ? "initial" : "none"};
  transform: ${({ $isMenuOpen }) => $isMenuOpen ? "translateX(0)" : "translateX(100%)"};
  background-color: var(--bg-2);


  .colorfull-box {
    background-color: ${({ $color }) => $color ? $color : "#0BAD7B"};
    color: var(--txt-1);
    height: 130px;
    margin-bottom: 20px;
    position: relative;
  }
`