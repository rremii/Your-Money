import { useEffect, useState } from "react"
import { useConfirmEmailMutation } from "@entities/Auth/api/AuthApi.ts"
import { useTimer } from "@shared/hooks/useTimer.ts"
import { CodeResult } from "@features/ResendAuthCode/constants/CodeResult.ts"

export const useResendCode = () => {
  const [resultStr, setResultStr] = useState(CodeResult.initial)

  const [sendCode, { isSuccess, isLoading, reset, isError, isUninitialized }] = useConfirmEmailMutation()

  const Reset = () => {
    setResultStr(CodeResult.initial)
    reset()
  }

  const { Reset: ResetTimer, time } = useTimer({ finalTime: 30, timeGap: 1, isUnversed: true, callback: Reset })

  const ResendCode = async (email: string) => {
    await sendCode(email)
    ResetTimer()
  }


  useEffect(() => {
    if (isSuccess) setResultStr(CodeResult.success)
    if (isError) setResultStr(CodeResult.rejected)
  }, [isSuccess, isError])


  return {
    ResendCode,
    isError, isLoading, isUninitialized, isSuccess, time, resultStr
  }
}