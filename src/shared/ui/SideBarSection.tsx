import styled from "styled-components"

export const SideBarSection = styled.section`
  width: 100%;
  padding-left: 20px;

  .title {
    color: var(--txt-3);
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
    margin-top: 17px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .SideBarButton:last-child {
      .text-info {
        border-bottom: 1px transparent solid;
      }
    }
  }
`