import styled from "styled-components"
import { FC } from "react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

interface props {
  // activeType: TransactionType
  // scrollPercent: number
}

export const EditCategoriesSubHeader: FC<props> = () => {

  const categoryType = useTypedSelector(state => state.NewCategory.type)

  const scrollPercent = categoryType === "expense" ? 0 : 100
  return <SlideHeaderLayout $scrollPercent={scrollPercent}>
    <div className="cell">
      <p className={`type ${categoryType === "expense" ? "active" : ""}`}>EXPENSE</p>
    </div>
    <div className="cell">
      <p className={`type ${categoryType === "income" ? "active" : ""}`}>INCOME</p>
    </div>
    <div className="slider">
      <div className="pushing-bar" />
      <div className="bar" />
    </div>
  </SlideHeaderLayout>
}
const SlideHeaderLayout = styled.header<{
  $scrollPercent?: number
}>`
  display: flex;
  height: 30px;
  position: relative;
  box-shadow: 0 0px 10px -10px var(--shadow-3);

  .slider {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;

    .pushing-bar {
      transition: 0.7s width;

      width: ${({ $scrollPercent }) => ($scrollPercent || 0) / 2}%;
    }

    .bar {

      flex: 0 0 50%;
      background-color: var(--bg-1);
      height: 3px;
      border-radius: 10px 10px 0px 0px;
    }
  }

  .cell {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .type {
      transition: color .3s;
      color: rgba(255, 255, 255, 0.5);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .active {
      color: var(--txt-1);
    }
  }
`