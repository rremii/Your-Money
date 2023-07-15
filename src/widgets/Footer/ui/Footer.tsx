import styled from "styled-components"
//TODO grab all the imports to constants and import from there
import Categories from "@shared/assets/LightTheme/categories.png"
import CategoriesActive from "@shared/assets/LightTheme/categories-active.png"
import Accounts from "@shared/assets/LightTheme/accounts.png"
import AccountsActive from "@shared/assets/LightTheme/accounts-active.png"
import TransActions from "@shared/assets/LightTheme/transactions.png"
import TransActionsActive from "@shared/assets/LightTheme/transactions-active.png"
import Overview from "@shared/assets/LightTheme/overview.png"
import OverviewActive from "@shared/assets/LightTheme/overview-active.png"
import { useMemo } from "react"
import { Link } from "@widgets/Footer/ui/Link.tsx"

export const Footer = () => {
  const NavLinks = useMemo(
    () => [
      {
        src: Accounts,
        name: "Accounts",
        href: "accounts",
        srcActive: AccountsActive,
      },
      {
        src: Categories,
        name: "Categories",
        href: "categories",
        srcActive: CategoriesActive,
      },
      {
        src: TransActions,
        name: "TransActions",
        href: "transActions",
        srcActive: TransActionsActive,
      },
      {
        src: Overview,
        name: "Overview",
        href: "overview",
        srcActive: OverviewActive,
      },
    ],
    [],
  )

  return (
    <FooterLayout>
      {NavLinks.map((linkData, i) => (
        <Link key={i} {...linkData} />
      ))}
    </FooterLayout>
  )
}
const FooterLayout = styled.footer`
  background-color: var(--bg-1);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 55px;
`
