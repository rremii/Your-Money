import styled from "styled-components"

export const EditCategoriesHeader = () => {
  return <HeaderLayout>
    Edit categories
  </HeaderLayout>
}
const HeaderLayout = styled.header`
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 60px;
  color: var(--txt-1);
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`