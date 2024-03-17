import styled from "styled-components"
import { FC } from "react"

interface props {
  errorMsg?: string
}

export const FallbackPage: FC<props> = ({ errorMsg }) => {
  return (
    <FallbackPageLayout>
      We are sorry, some error has happened, it may disappear after a while,
      please contact the developer, email: noruto2021@gmail.com <br />
      full error: {errorMsg}
    </FallbackPageLayout>
  )
}
const FallbackPageLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  max-width: 450px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
`
