import styled from "styled-components"
import { FC, memo } from "react"
import { ICategory } from "@entities/Category/type.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"

interface props extends ICategory {
  isActive?: boolean
  OnClick?: (category: ICategory) => void
}

export const Category: FC<props> = memo(
  ({ OnClick, isActive, ...category }) => {
    const { name, icon, color } = category

    const HandleOnClick = () => {
      if (OnClick) OnClick(category)
    }

    return (
      <CategoryLayout
        className="Category"
        onClick={HandleOnClick}
        $color={color}
        $isActive={isActive}
      >
        <p className="name">{name}</p>
        <div className="icon">
          <CustomIcon
            boxSize="47px"
            iconSize="25px"
            boxColor={color}
            icon={icon}
            color={"white"}
          />
        </div>
      </CategoryLayout>
    )
  },
)
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
  background-color: ${({ $isActive, $color }) =>
    $isActive ? $color : "transparent"};

  .name {
    color: ${({ $isActive }) =>
      $isActive ? "var(--txt-1)" : "var(--sub-txt)"};
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .icon {
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};
  }
`
