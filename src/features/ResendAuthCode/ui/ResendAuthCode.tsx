import styled from "styled-components"
import { useConfirmEmailMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEffect, useState } from "react"
import { useTimer } from "@shared/hooks/useTimer.ts"
import { useResendCode } from "@features/ResendAuthCode/model/useResendCode.tsx"


export const ResendAuthCode = () => {


  const email = useTypedSelector(state => state.Auth.email)

  const { ResendCode, time, isUninitialized, isLoading, resultStr, isError, isSuccess } = useResendCode()

  const HandleClick = async () => {
    await ResendCode(email)
  }

  return <AuthCodeLayout disabled={isLoading || !isUninitialized} onClick={HandleClick}>
    {resultStr} {(isSuccess || isError) && <span>send another one in {time}s</span>}
  </AuthCodeLayout>
}
const AuthCodeLayout = styled.button`
  color: var(--txt-6);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  span {
    text-decoration-line: underline;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    cursor: inherit;
  }
`