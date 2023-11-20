import styled from "styled-components"
import React, { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { openMenu } from "@entities/UI/model/ModalsSlice.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"


interface props {
  right: React.ReactNode
}

export const TopHeader: FC<props> = ({ right }) => {
  const dispatch = useAppDispatch()


  const balance = useTypedSelector(state => state.CurAccount.balance)
  const curCurrencySign = useTypedSelector(state => state.Settings.curCurrencySign)


  const OpenSideBar = () => {
    dispatch(openMenu("sideBar"))
  }


  return <TopHeaderLayout>
    <div onClick={OpenSideBar} className="burger left">
      <span />
      <span />
      <span />
    </div>
    <div className="info center">
      <p>All accounts</p>
      <p>{balance < 0 ? "-" : ""} {curCurrencySign} {Math.abs(RoundDecimal(balance, 2))}</p>
    </div>
    <div className="right">{right}</div>
  </TopHeaderLayout>
}
const TopHeaderLayout = styled.div`
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

`