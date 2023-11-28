import styled from "styled-components"
import { FC, memo } from "react"

interface props {
  title: string
}

export const IconTitle: FC<props> = memo(({ title }) => {
  return <TitleLayout>
    {title}
  </TitleLayout>
})
const TitleLayout = styled.h2`
  color: #858585;
  flex: 1 1 100%;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.26px;

`