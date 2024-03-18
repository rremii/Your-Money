import styled from "styled-components"
import { CreateAccountIcon } from "@features/CreateAccountIcon/ui/CreateAccountIcon.tsx"
import { NameInput } from "@widgets/EditCreateAccountMenu/ui/NameInput.tsx"
import { EditAccountHeader } from "@widgets/EditCreateAccountMenu/ui/EditAccountHeader.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { DeleteAccount } from "@features/DeleteAccount/ui/DeleteAccount.tsx"
import { CurrencyCell } from "@widgets/EditCreateAccountMenu/ui/CurrencyCell.tsx"
import { BalanceCell } from "@widgets/EditCreateAccountMenu/ui/BalanceCell.tsx"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const EditCreateAccountMenu = memo(() => {
  const isMenuOpen = useTypedSelector(
    (state) => state.UI.Modals.editCreateAccountMenu.isOpen,
  )
  const menuType = useTypedSelector(
    (state) => state.UI.Modals.editCreateAccountMenu.menuType,
  )
  const color = useTypedSelector((state) => state.NewAccount.color)

  const { t } = useTranslation()

  return (
    <EditCreateAccountLayout $isMenuOpen={isMenuOpen} $color={color}>
      <div className="colorfull-box">
        <EditAccountHeader />
        <NameInput />
        <CreateAccountIcon />
      </div>

      <h2 className="section-header">
        {t("accountMenu.sections.account.title")}
      </h2>
      <CurrencyCell />

      <h2 className="section-header">
        {t("accountMenu.sections.balance.title")}
      </h2>
      <BalanceCell />

      {menuType === "edit" && <DeleteAccount />}
    </EditCreateAccountLayout>
  )
})
const EditCreateAccountLayout = styled.section<{
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
  transition: transform 0.5s;
  pointer-events: ${({ $isMenuOpen }) => ($isMenuOpen ? "initial" : "none")};
  transform: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "translateX(0)" : "translateX(100%)"};
  background-color: var(--main-bg);

  .section-header {
    padding: 10px 15px;
    background-color: var(--sub-bg);
    font-weight: 400;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: ${({ $color }) => $color || "black"};
    box-shadow: 0 -5px 5px -5px #0000003f;
  }

  .colorfull-box {
    background-color: ${({ $color }) => ($color ? $color : "#0BAD7B")};
    color: #ffffff;
    height: 130px;
    //margin-bottom: 20px;
    position: relative;
  }
`
