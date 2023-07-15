import styled from "styled-components"
import { FC } from "react"

interface props {
  right: React.ReactNode
}

export const Header: FC<props> = ({ right }) => {
  return (
    <HeaderLayout>
      <div className="burger left">
        <span />
        <span />
        <span />
      </div>
      <div className="info center">
        <p>All accounts</p>
        <p>-Br 495.30</p>
      </div>
      <div className="right">{right}</div>
    </HeaderLayout>
  )
}
const HeaderLayout = styled.header`
  height: 50px !important;
  background-color: var(--bg-3);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 0 17px;
  //justify-items: center;
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

    p {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 12px;
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
