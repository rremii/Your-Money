import styled from "styled-components"

export const NotesInput = () => {
  return <InputLayout placeholder="Notes ...">

  </InputLayout>
}
const InputLayout = styled.input`
  height: 53px;
  width: 100%;

  background-color: var(--bg-1);
  color: var(--txt-2);
  font-family: Inter;
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  padding: 0 20px;

  &::placeholder {
    color: var(--txt-2);
    font-family: Inter;
    font-size: 13px;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }
`