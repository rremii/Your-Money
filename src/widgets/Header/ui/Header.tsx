import styled from "styled-components"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setIsSideBar } from "@entities/SideBar"
import { getCurBalance } from "@entities/Account/model/AccountSlice.ts"

interface props {
  right?: React.ReactNode
  left?: React.ReactNode
  center?: React.ReactNode
  SubHeader?: React.ReactNode
}

export const Header: FC<props> = ({ right, SubHeader }) => {
  const dispatch = useAppDispatch()

  const curMenuId = useTypedSelector(state => state.Date.curMenuId)
  const balance = useTypedSelector(getCurBalance)

  const OpenSideBar = () => {
    dispatch(setIsSideBar(true))
  }

  return (
    <HeaderLayout $isActive={curMenuId === 0}>
      <div className="top-header">
        <div onClick={OpenSideBar} className="burger left">
          <span />
          <span />
          <span />
        </div>
        <div className="info center">
          <p>All accounts</p>
          <p>Br {balance}</p>
        </div>
        <div className="right">{right}</div>
      </div>
      <div className="sub-header">{SubHeader}</div>
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header<{
  $isActive?: boolean
}>`
  background-color: ${({ $isActive }) => $isActive ? "var(--account-color)" : "var(--bg-11)"};
  transition: 1s;

  box-shadow: 0px 2px 4px 0px var(--shadow-3);
  z-index: 1;

  .top-header {
    padding: 0 17px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 65px;
    align-items: center;
    display: grid;

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
  }


`
