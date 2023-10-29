import { Api } from "@shared/api/config/Api.ts"
import { IAccount } from "@entities/Account/types.ts"

export const AccountsApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetAccounts: build.query<IAccount[], number | undefined>({
      query: (userId) => ({
        url: "account",
        method: "GET",
        params: { userId }
      }),
      providesTags: ["Accounts"]
    })


  }),
  overrideExisting: false
})


export const {
  useGetAccountsQuery
} = AccountsApi

