import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React from "react"

export const CategoryCell = () => {
  return <CellLayout>
    <div className="icon">
      <img src={CategoriesIcons.get("Health")} alt="icon" />
    </div>
    <div className="text-info">
      <h2 className="name">Health</h2>
      <p className="quantity">Br 15</p>
    </div>
    <div className="percent-bar">
      <div className="bar" />
      <div className="filled-bar" />
      <div className="percent">15%</div>
    </div>
  </CellLayout>
}
const CellLayout = styled.div`
  box-shadow: 0px 2px 4px 0px var(--shadow-2);
  padding: 7px 15px;
  height: 45px;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: repeat(2, min-content);
  column-gap: 10px;
  row-gap: 2px;
  background-color: var(--bg-1);

  .icon {
    width: 32px;
    height: 32px;
    grid-row: span 2;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      color: var(--txt-5);
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .quantity {
      color: var(--txt-2);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .percent-bar {
    position: relative;
    background-color: red;
    height: 5px;

    .bar {

      background-color: var(--bg-10);
      height: 5px;
      width: 100%;
    }

    .filled-bar {
      position: absolute;
      height: 5px;
      background-color: var(--bg-9);
      left: 0;
      top: 0;
      width: 15%;

    }

    .percent {
      padding: 0 7px;
      background-color: var(--bg-1);
      position: absolute;
      top: 50%;
      left: 15%;
      transform: translateY(-50%);
      color: var(--txt-11);
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`