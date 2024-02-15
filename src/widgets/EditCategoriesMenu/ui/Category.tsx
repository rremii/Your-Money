import styled from "styled-components"
import { FC, memo } from "react"
import { ICategory } from "@entities/Category/type.ts"
import { CustomIcon } from "@shared/ui/CustomIcon/CustomIcon.tsx"

interface props extends ICategory {
  OnClick?: (category: ICategory) => void
}

export const Category: FC<props> = memo(({ OnClick, ...category }) => {
  const { name, icon, color } = category

  const HandleOnClick = () => {
    if (OnClick) OnClick(category)
  }

  return (
    <CategoryLayout className="Category" onClick={HandleOnClick} $color={color}>
      <p className="name">{name}</p>
      <div className="icon">
        <CustomIcon
          boxSize="45px"
          iconSize="25px"
          icon={icon}
          boxColor={color}
        />
      </div>
    </CategoryLayout>
  )
})
const CategoryLayout = styled.div<{
  $color?: string
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  .name {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  //.icon {
  //  width: 50px;
  //  height: 50px;
  //}
`
