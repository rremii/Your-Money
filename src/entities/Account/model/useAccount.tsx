import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { setCurAccount, setCurAccountId } from "@entities/Account/model/CurAccountSlice.ts"
import { useGetAccountsQuery } from "@entities/Account/api/AccountsApi.ts"

//todo
export const useAccount = (userId?: number) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.CurAccount.id)


  const { data: allAccounts } = useGetAccountsQuery(userId, {
    skip: !userId
  })


  useEffect(() => {
    dispatch(setCurAccountId(null))
  }, [allAccounts])

  useEffect(() => {
    if (allAccounts?.length === 0 || !allAccounts) return

    let curAcc = {} as IAccount

    if (typeof curAccId === "number") {
      curAcc = allAccounts.find(({ id }) => id === curAccId) as IAccount
    } else {
      curAcc.id = null
      curAcc.balance = allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
      curAcc.color = "#5C6AC0"
      curAcc.name = "all"
      curAcc.icon = ""
    }


    dispatch(setCurAccount(curAcc))
    document.documentElement.style.setProperty("--account-color", curAcc.color)
  }, [curAccId, allAccounts])


  return {
    allAccounts
  }
}