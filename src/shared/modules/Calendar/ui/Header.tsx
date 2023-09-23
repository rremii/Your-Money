import styled from "styled-components"

export const Header = () => {


  return <HeaderLayout>
    <p className="sub-title active">2023</p>
    <p className="title ">Fri,Sep 22</p>
  </HeaderLayout>
}
const HeaderLayout = styled.header`
  padding: 15px;
  background-color: rgb(63, 81, 181);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  .sub-title {
    color: var(--txt-1);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .title {
    margin: 0;
    color: var(--txt-1);
    font-family: Inter;
    font-size: 27px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .active {
    opacity: 0.5;
  }
`