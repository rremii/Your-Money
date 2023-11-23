import styled from "styled-components"
import Categories from "@shared/assets/LightTheme/categories.png"

export const DeleteCategory = () => {
  return <DeleteCategoryLayout>
    <img src={Categories} alt="delete icon" className="icon" />
    <p className="content">Delete category</p>
  </DeleteCategoryLayout>
}
const DeleteCategoryLayout = styled.div`
  cursor: pointer;
  background-color: var(--bg-1);
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 30px;
  box-shadow: 0 2px 5px 0 var(--shadow-3);

  .icon {
    width: 15px;
  }

  .content {
    color: var(--txt-7);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`