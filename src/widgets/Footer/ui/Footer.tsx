import styled from "styled-components"
import React from "react"
import { Link } from "@widgets/Footer/ui/Link.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { LinksData } from "@widgets/Footer/constants/LinksData.ts"

export const Footer = React.memo(() => {
  const isEditCategoriesMode = useTypedSelector(
    (state) => state.UI.Pages.categoryPage.isCategoriesEditMode,
  )

  // const NavLinks = useMemo(() => [])

  const KeepCurMenuScroll = () => {
    const curScroll = document.querySelector("#slider")?.scrollLeft
    if (!curScroll) return
    window.localStorage.setItem("scroll", curScroll.toString())
  }

  return (
    <FooterLayout $isHidden={isEditCategoriesMode}>
      {LinksData.map((linkData, i) => (
        <Link OnClick={KeepCurMenuScroll} key={i} {...linkData} />
      ))}
    </FooterLayout>
  )
})
const FooterLayout = styled.footer<{
  $isHidden?: boolean
}>`
  z-index: 4;
  position: fixed;
  transition: transform 0.5s;
  transform: ${({ $isHidden }) => ($isHidden ? "translateY(100%)" : "")};
  bottom: 0;
  width: 100vw;
  max-width: 450px;
  box-shadow: 0 1px 5px 0 #5c6ac07f;
  background-color: var(--sub-bg);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 55px;
`
