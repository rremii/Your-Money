import styled from "styled-components"
import { FC } from "react"
import { CategoriesIcons } from "@shared/constants/CategoriesIcons.ts"
import { ICategory } from "@entities/Transaction/types.ts"


interface props extends ICategory {
  isActive?: boolean
  OnClick: (category: ICategory) => void
}

export const Category: FC<props> = ({ OnClick, isActive, ...category }) => {
  const { name, icon, color } = category

  return <CategoryLayout className="Category" onClick={() => OnClick(category)} $color={color}
                         $isActive={isActive}>
    <p className="name">{name}</p>
    <img className="icon" src={CategoriesIcons.get(icon)} alt={"category icon"} />
  </CategoryLayout>
}
const CategoryLayout = styled.div<{
  $isActive?: boolean
  $color?: string
}>`
  //background-color: blue;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  gap: 6px;
  flex-direction: column;
  cursor: pointer;
  background-color: ${({ $isActive, $color }) => $isActive ? $color : "transparent"};

  .name {
    color: ${({ $isActive }) => $isActive ? "var(--txt-1)" : "var(--txt-2)"};
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .icon {
    width: 47px;
    height: 47px;
    border-radius: 50%;
    opacity: ${({ $isActive }) => $isActive ? 1 : 0.7};

  }



`