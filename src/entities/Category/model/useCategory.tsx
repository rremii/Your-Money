import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Accounts, IAccount } from "@entities/Account/constants/Accounts.ts"
import { changeAccountId, setAllAccounts, setCurAccount } from "@entities/Account/model/AccountSlice.ts"
import { useGetAccountsQuery, useLazyGetAccountsQuery } from "@entities/Account/api/AccountsApi.ts"
import { useGetCategories } from "@entities/Category/api/CategoriesApi.ts"

//todo
export const useCategory = (userId?: number) => {
  const dispatch = useAppDispatch()

  const curAccId = useTypedSelector(state => state.Account.curAccId)


  const { data: allCategories } = useGetCategories(userId, {
    skip: !userId
  })

}