import styled from "styled-components"
import { CreateAccountIcon } from "@features/CreateAccountIcon/ui/CreateAccountIcon.tsx"
import { NameInput } from "@widgets/EditCreateAccountMenu/ui/NameInput.tsx"
import { EditAccountHeader } from "@widgets/EditCreateAccountMenu/ui/EditAccountHeader.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { DeleteAccount } from "@features/DeleteAccount/ui/DeleteAccount.tsx"
import { CurrencyCell } from "@widgets/EditCreateAccountMenu/ui/CurrencyCell.tsx"
import { BalanceCell } from "@widgets/EditCreateAccountMenu/ui/BalanceCell.tsx"

export const EditCreateAccountMenu = () => {

  const isMenuOpen = useTypedSelector(state => state.UI.Modals.editCreateAccountMenu.isOpen)
  const menuType = useTypedSelector(state => state.UI.Modals.editCreateAccountMenu.menuType)
  const color = useTypedSelector(state => state.NewAccount.color)


  return <EditCreateAccountLayout $isMenuOpen={isMenuOpen} $color={color}>
    <div className="colorfull-box">
      <EditAccountHeader />
      <NameInput />
      <CreateAccountIcon />
    </div>

    <header className="section-header">Account</header>
    <CurrencyCell />

    <header className="section-header">Balance</header>
    <BalanceCell />

    {menuType === "edit" && (
      <DeleteAccount />
    )}
  </EditCreateAccountLayout>
}
const EditCreateAccountLayout = styled.div<{
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

  .section-header {
    padding: 10px 15px;
    background-color: white;
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: ${({ $color }) => $color || "black"};
    box-shadow: 0 -5px 5px -5px var(--shadow-3);
  }

  .colorfull-box {
    background-color: ${({ $color }) => $color ? $color : "#0BAD7B"};
    color: var(--txt-1);
    height: 130px;
    //margin-bottom: 20px;
    position: relative;
  }
`