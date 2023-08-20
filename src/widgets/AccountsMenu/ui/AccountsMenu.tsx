import styled from "styled-components"
import { AllAccountsInfo } from "@widgets/AccountsMenu/ui/AllAccountsInfo.tsx"
import { Account } from "@widgets/AccountsMenu/ui/Account.tsx"
import { Accounts } from "@entities/Transaction/constants/Accounts.ts"


export const AccountsMenu = () => {


  return <AccountsMenuLayout>
    <AllAccountsInfo />
    {Accounts.map(({ name, balance, icon }) => (
      <Account key={name} quantity={balance} name={name} icon={icon} />
    ))}
  </AccountsMenuLayout>
}
const AccountsMenuLayout = styled.main`
  background-color: var(--bg-1);
  width: 100%;
  height: 100%;

  .Account:last-child .accounts-info {
    border-bottom: none;
  }
`