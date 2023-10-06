import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import React, { useEffect, useState } from "react"
import { CategorySlideHeader } from "@widgets/ChooseCategorySlideMenu/ui/CategorySlideHeader.tsx"
import { ChooseCategorySlider } from "@widgets/ChooseCategorySlideMenu/ui/ChooseCategorySlider.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { AccountInfo } from "@widgets/ChooseCategorySlideMenu/ui/AccountInfo.tsx"
import { GetMe } from "@entities/User/api/UserApi.ts"
import { useAccount } from "@entities/Account/model/useAccount.tsx"
import { setAccount } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { setChooseCategorySlideMenu } from "@entities/Modals/model/ChooseCategorySlideMenuSlice.ts"

export const ChooseCategorySlideMenu = () => {
  const dispatch = useAppDispatch()

  const [scrollPercent, setScrollPercent] = useState(0)

  const isMenuOpen = useTypedSelector(state => state.Modals.ChooseCategorySlideMenu.isOpen)
  const activeType = useTypedSelector(state => state.EditCreateTransaction.Transaction.type)
  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const chosenAccount = useTypedSelector(state => state.EditCreateTransaction.ChosenAccount)


  const { data: user } = GetMe.useQueryState()
  const { allAccounts } = useAccount(user?.id)

  useEffect(() => {
    if (!allAccounts?.length) return
    const curAccount = curAccId ? allAccounts.find(({ id }) => id === curAccId) : allAccounts[0]

    if (!curAccount) return
    dispatch(setAccount(curAccount))
  }, [allAccounts])


  const CloseMenu = () => {
    dispatch(setChooseCategorySlideMenu(false))
  }

  const OnScroll = (scroll: number) => {
    setScrollPercent(scroll)
  }


  return <>
    <Overlay onClick={CloseMenu}
             $isActive={isMenuOpen} $zIndex={50}
             $color={"rgba(0, 0, 0, 0.5 )"} />
    <CategorySlideMenuLayout $isOpen={isMenuOpen}>
      <AccountInfo {...chosenAccount} />
      <CategorySlideHeader scrollPercent={scrollPercent} activeType={activeType} />
      <ChooseCategorySlider onScroll={OnScroll} />
    </CategorySlideMenuLayout>
  </>
}
const CategorySlideMenuLayout = styled(Modal)`
  z-index: 50;
  width: 100%;
  max-width: 370px;
  bottom: 0;
  top: initial;
  transform: translate(-50%, 0);
  padding: 0;
`