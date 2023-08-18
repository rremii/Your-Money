import styled from "styled-components"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setIsSideBar } from "@entities/SideBar"

interface props {
  right?: React.ReactNode
  left?: React.ReactNode
  center?: React.ReactNode
  SubHeader?: React.ReactNode
}

export const Header: FC<props> = ({ right, SubHeader }) => {
  const dispatch = useAppDispatch()
  
  const curMenuId = useTypedSelector(state => state.Date.curMenuId)


  const OpenSideBar = () => {
    dispatch(setIsSideBar(true))
  }

  return (
    <HeaderLayout $isActive={curMenuId === 0}>
      <div onClick={OpenSideBar} className="burger left">
        <span />
        <span />
        <span />
      </div>
      <div className="info center">
        <p>All accounts</p>
        <p>-Br 495.30</p>
      </div>
      <div className="right">{right}</div>
      <div className="sub-header">{SubHeader}</div>
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  background-color: ${({ $isActive }) => $isActive ? "var(--bg-3)" : "var(--bg-11)"};
  display: grid;
  transition: 1s;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 65px min-content;
  padding: 0 17px;
  align-items: center;

  .burger {
    display: flex;
    flex-direction: column;
    width: 18px;
    gap: 3px;
    cursor: pointer;

    span {
      width: 100%;
      height: 2px;
      background-color: var(--bg-1);
    }
  }

  .info {
    justify-self: center;

    p:nth-child(1) {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    p:nth-child(2) {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .right {
    width: 20px;
    height: 20px;
    justify-self: right;
  }

  .right * {
    width: 100%;
    height: 100%;
  }

  .sub-header {
    grid-column: 1/4;
  }
`
