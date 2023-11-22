import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import CategoriesActive from "@shared/assets/LightTheme/categories-active.png"
import Accounts from "@shared/assets/LightTheme/accounts.png"
import AccountsActive from "@shared/assets/LightTheme/accounts-active.png"
import TransActions from "@shared/assets/LightTheme/transactions.png"
import TransActionsActive from "@shared/assets/LightTheme/transactions-active.png"
import Overview from "@shared/assets/LightTheme/overview.png"
import OverviewActive from "@shared/assets/LightTheme/overview-active.png"
import React, { useMemo } from "react"
import { Link } from "@widgets/Footer/ui/Link.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const Footer = React.memo(() => {
  const isEditCategoriesMode = useTypedSelector(state => state.UI.Pages.categoryPage.isCategoriesEditMode)


  const NavLinks = useMemo(
    () => [
      {
        src: Accounts,
        name: "Accounts",
        href: "/accounts",
        srcActive: AccountsActive
      },
      {
        src: Categories,
        name: "Categories",
        href: "/categories",
        srcActive: CategoriesActive
      },
      {
        src: TransActions,
        name: "TransActions",
        href: "/transActions",
        srcActive: TransActionsActive
      },
      {
        src: Overview,
        name: "Overview",
        href: "/overview",
        srcActive: OverviewActive
      }
    ],
    []
  )

  return (
    <FooterLayout $isHidden={isEditCategoriesMode}>
      {NavLinks.map((linkData, i) => (
        <Link key={i} {...linkData} />
      ))}
    </FooterLayout>
  )
})
const FooterLayout = styled.footer<{
  $isHidden?: boolean
}>`
  z-index: 4;
  position: fixed;
  transition: transform .5s;
  transform: ${({ $isHidden }) => $isHidden ? "translateY(100%)" : ""};
  bottom: 0;
  width: 100vw;
  max-width: 450px;
  box-shadow: 0 1px 5px 0 var(--shadow-1);
  //border-top: var(--shadow-1) 1px solid;
  background-color: var(--bg-1);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 55px;
  //display: none;
`
