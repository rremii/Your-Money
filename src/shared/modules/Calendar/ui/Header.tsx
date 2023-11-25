import styled from "styled-components"
import { CategoriesIcons } from "@shared/modules/IconColorPicker/constants/CategoriesIcons.ts"

export const Header = () => {


  return <HeaderLayout $color={"green"}>
    <div className="icon-box">
      <img className="icon" src={CategoriesIcons.get("burger")} alt="current icon" />
    </div>
    <h1 className="title">Category icon</h1>
  </HeaderLayout>
}
const HeaderLayout = styled.header<{
  $color?: string
}>`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 65px;
  padding: 0 22px;

  .icon-box {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color ? $color : "#0BAD7B"};
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 25px;
      height: 25px;
    }
  }

  h1.title {
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.32px;
    margin-bottom: 0;
  }


`