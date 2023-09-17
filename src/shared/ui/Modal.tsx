import styled from "styled-components"

export const Modal = styled.div<{
  $isOpen?: boolean
}>`
  padding: 25px 22px;
  position: fixed;
  display: block;
  top: 50%;
  max-width: 320px;
  width: 90%;
  left: 50%;
  transform: ${({ $isOpen }) => $isOpen ? "scale(1)" : "scale(0.7)"} translate(-50%, -50%);
  transform-origin: bottom center;
  z-index: 20;
  background-color: var(--bg-1);
  border-radius: 3px;


  transition: 0.3s;

  pointer-events: ${({ $isOpen }) => $isOpen ? "initial" : "none"};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};

  .title {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 21px;
  }

  .content {
    color: var(--txt-2);
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
      color: var(--txt-7);
    }

    .gray {
      color: var(--txt-2);
    }

    .purple {
      color: var(--txt-4);
    }
  }

`