import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { setCurAccount, setCurAccountId } from "@entities/Account/model/CurAccountSlice.ts"
import { useGetAccountsQuery } from "@entities/Account/api/AccountsApi.ts"
import { setAllAccountBalance } from "@entities/Account/model/AllAccountSlice.ts"
import { IAccount } from "@entities/Account/types.ts"

export const useAccount = (userId?: number) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.CurAccount.id)
  const allAccount = useTypedSelector(state => state.AllAccount)


  const { data: allAccounts } = useGetAccountsQuery(userId, {
    skip: !userId
  })


  useEffect(() => {
    if (!allAccounts) return

    dispatch(setCurAccountId(null))

    const allAccBalance = allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
    dispatch(setAllAccountBalance(allAccBalance))

  }, [allAccounts])

  useEffect(() => {
    if (allAccounts?.length === 0 || !allAccounts) return

    let curAcc
    if (typeof curAccId === "number") {
      curAcc = allAccounts.find(({ id }) => id === curAccId) as IAccount
    } else {
      curAcc = allAccount
    }


    dispatch(setCurAccount(curAcc))
    document.documentElement.style.setProperty("--account-color", curAcc.color)
  }, [curAccId, allAccounts])


  const getAccountById = (id: number | null): IAccount | null => {
    if (id)
      return allAccounts?.find((account) => account.id === id) || null
    else
      return allAccounts?.at(0) || null
  }


  return {
    allAccounts, getAccountById
  }
}