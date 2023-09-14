import styled from "styled-components"
import { FC } from "react"

interface props {
  content: string
}

//todo create an icon component in shared that will return svg and handle this
export const ChooseMenuHeader: FC<props> = ({ content }) => {

  return <HeaderLayout>
    {content.toUpperCase()}
  </HeaderLayout>
}
const HeaderLayout = styled.header`
  height: 45px;
  width: 100%;
  color: var(--txt-2);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 4px 4px 0px 0px;
    background-color: var(--bg-5);
  }
`