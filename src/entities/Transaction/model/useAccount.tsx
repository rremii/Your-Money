import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Accounts, IAccount } from "@entities/Transaction/constants/Accounts.ts"
import { changeAccount, setAllAccounts, setCurAccount } from "@entities/Account/model/AccountSlice.ts"

export const useAccount = () => {
  const dispatch = useAppDispatch()

  const curAccName = useTypedSelector(state => state.Account.curAccName)
  const allAccounts = useTypedSelector(state => state.Account.allAccounts)

  useEffect(() => {
    dispatch(setAllAccounts(Accounts))
    dispatch(changeAccount("All"))
  }, [])

  useEffect(() => {
    if (allAccounts.length === 0) return

    let curAcc = {} as IAccount

    if (curAccName !== "All") {
      curAcc = allAccounts.find(({ name }) => name === curAccName) as IAccount
    } else {
      curAcc.balance = allAccounts.reduce((acc, cur) => acc + cur.balance, 0)
      curAcc.color = "#5C6AC0"
    }

    dispatch(setCurAccount(curAcc))
    document.documentElement.style.setProperty("--account-color", curAcc.color)
  }, [curAccName, allAccounts])

}