import styled from "styled-components"

export const Modal = styled.article<{
  $isOpen?: boolean
}>`
  padding: 25px 20px;
  position: fixed;
  top: 50%;
  max-width: 320px;
  width: 90%;
  left: 50%;
  transform: ${({ $isOpen }) => ($isOpen ? "scale(1)" : "scale(0.7)")}
    translate(-50%, -50%);
  transform-origin: bottom center;
  z-index: 20;
  background-color: var(--sub-bg-light);
  border-radius: 3px;
  transition: 0.3s;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "initial" : "none")};
  display: block;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  .title {
    color: var(--sub-txt);
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 21px;
  }

  .content {
    color: #7d7d7d;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 30px;
  }

  .btn-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;

    button {
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .red {
      color: #ba4c4b;
    }

    .gray {
      color: #7d7d7d;
    }

    .purple {
      color: #606ca6;
    }
  }
`
