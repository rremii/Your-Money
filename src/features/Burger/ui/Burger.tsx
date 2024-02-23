import styled from "styled-components"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setCategoriesEditMode } from "@entities/UI/model/PagesSlice.ts"

export const Burger = () => {
  const dispatch = useAppDispatch()

  const isEditCategoriesMode = useTypedSelector(
    (state) => state.UI.Pages.categoryPage.isCategoriesEditMode,
  )

  const OpenSideBar = () => {
    dispatch(openMenu("sideBar"))
  }
  const OffCategoriesEditMode = () => {
    dispatch(setCategoriesEditMode(false))
  }

  const OnClick = () => {
    if (isEditCategoriesMode) {
      OffCategoriesEditMode()
    } else {
      OpenSideBar()
    }
  }

  return (
    <BurgerLayout $isArrow={isEditCategoriesMode} onClick={OnClick}>
      <div className={`container ${isEditCategoriesMode ? "arrow" : ""}`}>
        <span />
        <span />
        <span />
      </div>
    </BurgerLayout>
  )
}
const BurgerLayout = styled.div<{
  $isArrow?: boolean
}>`
  cursor: pointer;
  position: absolute;
  z-index: 100;
  left: 17px;
  top: 26px;

  .container {
    display: flex;
    flex-direction: column;
    width: 18px;
    gap: 3px;
    transition: all 0.4s;
    transform: rotate(180deg);

    span {
      transition: transform 0.4s;
      width: 100%;
      height: 2px;
      background-color: var(--bg-1);
    }
  }

  .arrow {
    transform: rotate(360deg);

    span:nth-child(1) {
      transform: rotate(-45deg) scaleX(0.5) scaleY(0.8) translateX(-10px)
        translateY(-2.5px);
    }

    span:nth-child(2) {
      transform: translateX(1px) scaleY(1);
    }

    span:nth-child(3) {
      transform: rotate(45deg) scaleX(0.5) scaleY(0.8) translateX(-10px)
        translateY(1.8px);
    }
  }
`
