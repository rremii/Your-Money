import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Accounts, IAccount } from "@entities/Transaction/constants/Accounts.ts"
import { changeAccountId, setAllAccounts, setCurAccount } from "@entities/Account/model/AccountSlice.ts"
import { useGetAccountsQuery, useLazyGetAccountsQuery } from "@entities/Transaction/api/TransactionApi.ts"

export const useAccount = (userId?: number) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.Account.curAccId)
  // const allAccounts = useTypedSelector(state => state.Account.allAccounts)


  const { data: allAccounts } = useGetAccountsQuery(userId, {
    skip: !userId
  })
  // debugger
  useEffect(() => {
    if (!allAccounts) return
    dispatch(setAllAccounts(allAccounts))
    dispatch(changeAccountId(1))
  }, [allAccounts])

  useEffect(() => {
    if (allAccounts?.length === 0 || !allAccounts) return

    let curAcc = {} as IAccount

    if (typeof curAccId === "number") {
      curAcc = allAccounts.find(({ id }) => id === curAccId) as IAccount
    } else {
      curAcc.balance = allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
      curAcc.color = "#5C6AC0"
    }

    dispatch(setCurAccount(curAcc))
    document.documentElement.style.setProperty("--account-color", curAcc.color)
  }, [curAccId, allAccounts])

}