import { useCallback, useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  setCurAccount,
  setCurAccountId,
} from "@entities/Account/model/CurAccountSlice.ts"
import { useGetAccountsQuery } from "@entities/Account/api/AccountsApi.ts"
import {
  setAllAccountBalance,
  setAllAccountCurrency,
} from "@entities/Account/model/AllAccountSlice.ts"
import { IAccount } from "@entities/Account/types.ts"
import { useCurrencyConverter } from "@entities/Currency/model/useCurrencyConverter.ts"

export const useAccount = (userId?: number) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector((state) => state.CurAccount.id)
  const allAccount = useTypedSelector((state) => state.AllAccount)
  const curCurrency = useTypedSelector((state) => state.Settings.curCurrency)

  const { data: allAccounts } = useGetAccountsQuery(userId, {
    skip: !userId,
  })

  const { convertCurrency } = useCurrencyConverter()

  useEffect(() => {
    if (!allAccounts) return

    const initAccountId = window.localStorage.getItem("curAccountId")

    dispatch(
      setCurAccountId(
        initAccountId !== "null" && initAccountId ? +initAccountId : null,
      ),
    )

    const allAccBalance = allAccounts.reduce((acc, cur) => {
      return acc + convertCurrency(cur.balance, cur.currency, curCurrency)
    }, 0)
    dispatch(setAllAccountBalance(allAccBalance))
    dispatch(setAllAccountCurrency(curCurrency))
  }, [allAccounts])

  useEffect(() => {
    if (allAccounts?.length === 0 || !allAccounts) return

    let curAcc: IAccount
    let convertedBalance = 0
    if (typeof curAccId === "number") {
      curAcc = allAccounts.find(({ id }) => id === curAccId) as IAccount
      convertedBalance = convertCurrency(
        curAcc.balance,
        curAcc.currency,
        curCurrency,
      )
    } else {
      curAcc = allAccount
      convertedBalance = allAccount.balance
    }

    dispatch(setCurAccount({ ...curAcc, balance: convertedBalance }))
    document.documentElement.style.setProperty("--account-color", curAcc.color)
  }, [curAccId, allAccounts, dispatch, allAccount])

  const getAccountById = useCallback(
    (id: number | null): IAccount | null => {
      if (id) return allAccounts?.find((account) => account.id === id) || null
      else return allAccounts?.at(0) || null
    },
    [allAccounts],
  )

  const getAccountIds = useCallback((): number[] => {
    return allAccounts?.map(({ id }) => id) || []
  }, [allAccounts])

  const accountIds = getAccountIds()
  return {
    allAccounts,
    getAccountById,
    accountIds,
  }
}
