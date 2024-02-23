import styled from "styled-components"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/UI/model/ModalsSlice.ts"
import { ChooseMenuHeader } from "@shared/ui/ChooseMenuHeader.tsx"
import React from "react"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { ChooseAccount } from "@features/ChangeAccountModal/ui/ChooseAccount.tsx"

export const ChangeAccountModal = () => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(
    (state) => state.UI.Modals.changeAccountMenu.isOpen,
  )
  const allAccount = useTypedSelector((state) => state.AllAccount)
  const currencyFormat = useTypedSelector(
    (state) => state.Settings.currencyFormat,
  )
  const curAccName = useTypedSelector((state) => state.CurAccount.name)

  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  const CloseChangeAccountMenu = () => {
    dispatch(closeMenu("changeAccountMenu"))
  }
  return (
    <>
      <Overlay
        $zIndex={55}
        $color={"transparent"}
        $isActive={isOpen}
        onClick={CloseChangeAccountMenu}
      />
      <ChangeAccountLayout
        onClick={CloseChangeAccountMenu}
        $isMenuOpen={isOpen}
      >
        <ChooseMenuHeader content={"ACCOUNT FILTER"} />
        <div className="all-account">
          <ChooseAccount
            curName={curAccName}
            currencyFormat={currencyFormat}
            key={allAccount?.id}
            {...allAccount}
          />
        </div>
        <div className="accounts">
          <div className="title">ACCOUNTS</div>
          {allAccounts?.map((account) => (
            <ChooseAccount
              curName={curAccName}
              currencyFormat={currencyFormat}
              key={account?.id}
              {...account}
            />
          ))}
        </div>
      </ChangeAccountLayout>
    </>
  )
}
const ChangeAccountLayout = styled.div<{
  $isMenuOpen?: boolean
}>`
  z-index: 56;
  box-shadow: -1px 2px 10px -4px rgba(0, 0, 0, 0.48);
  position: absolute;
  max-width: 90%;
  width: 315px;
  //height: 265px;
  top: 5px;
  border-radius: 3px;
  right: 3px;
  transition:
    transform 0.5s,
    opacity 0.3s;
  pointer-events: ${({ $isMenuOpen }) => ($isMenuOpen ? "initial" : "none")};
  transform: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? 1 : 0)};
  background-color: var(--sub-bg);
  padding-bottom: 10px;

  .Account .accounts-info {
    border-bottom: none;
  }

  .all-account {
    padding: 5px 0;
    border-bottom: 1px solid rgba(174, 174, 174, 0.69);
  }

  .ChooseMenuHeader {
    font-size: 13px;
    border-bottom: 2px solid rgba(126, 126, 126, 0.59);
  }

  .accounts {
    .title {
      padding: 10px 13px;
      font-family: Inter, sans-serif;
      font-weight: 400;
      font-size: 13px;
      color: #848484;
    }
  }
`
