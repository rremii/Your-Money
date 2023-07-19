import styled from "styled-components"

export const ORSeparator = () => {
  return <OrSeparatorLayout className="OrSeparator">OR</OrSeparatorLayout>
}
const OrSeparatorLayout = styled.div`
  color: var(--txt-6);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;

  &::after {
    z-index: -2;
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: var(--separator-2);
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &::before {
    content: "";
    position: absolute;
    width: 45px;
    height: 25px;
    z-index: -1;
    background-color: var(--bg-1);
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`
