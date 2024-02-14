import styled from "styled-components"
import React from "react"

export const AccountsSubHeader = () => {
  return (
    <SubHeaderLayout>
      <button className="cell">Accounts</button>
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .cell {
    width: 150px;
    height: 100%;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    color: var(--txt-1);
    font-family: Inter;
    padding: 10px 0;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: white;
      height: 3px;
      border-radius: 10px 10px 0px 0px;
    }
  }
`
