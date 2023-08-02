import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const DateSubHeader = () => {
  const dateGap = useTypedSelector(state => state.Categories.dateGap)

  return (
    <SubHeaderLayout>
      <div className="arrow-left">{"<"}</div>
      <div className="date">
        <img src={Categories} alt="days" />
        <span>{dateGap}</span>
      </div>
      <div className="arrow-right">{">"}</div>
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 10px;

  .arrow-left,
  .arrow-right {
    width: 10px;
    height: 10px;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }

  .date {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      color: var(--txt-1);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`
