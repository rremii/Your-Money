import styled from "styled-components"
import { FC } from "react"

interface props {
  content?: string
}

export const Notes: FC<props> = ({ content }) => {

  return <InputLayout>
    {content || "Notes ..."}
  </InputLayout>
}
const InputLayout = styled.div`
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-1);
  color: var(--txt-2);
  font-family: Inter;
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  padding: 0 10px;
  cursor: pointer;

`