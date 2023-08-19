import styled from "styled-components"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import React, { FC } from "react"


interface props {
  name: string
  quantity: number
  color: string
}

export const Category: FC<props> = ({ color, quantity, name }) => {

  return <CategoryLayout $color={quantity && color}>
    <h3 className="title">
      {name}
    </h3>
    <div className="icon">
      <img src={CategoriesIcons.get(name)} alt="category icon" />
    </div>
    <p className="quantity">
      Br {quantity}
    </p>
  </CategoryLayout>
}
const CategoryLayout = styled.div<{
  $color?: string
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  .title {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .icon {
    width: 45px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .quantity {
    color: ${({ $color }) => $color ? $color : "var(--txt-2)"};
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`