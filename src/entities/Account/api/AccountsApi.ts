import { Api } from "@shared/api/config/Api.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"

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


    //
    // ChangeName: build.mutation<DefaultResponse, ChangeName>({
    //   query: (data) => ({
    //     url: "users/name",
    //     method: "PUT",
    //     data
    //   }),
    //   invalidatesTags: ["User"]
    // }),
    //
    // ChangePassword: build.mutation<DefaultResponse, ChangePassword>({
    //   query: (data) => ({
    //     url: "users/password",
    //     method: "PUT",
    //     data
    //   }),
    //   invalidatesTags: ["User"]
    // })
    //

  }),
  overrideExisting: false
})
// export const {} = TransactionApi.endpoints

export const { GetAccounts } = AccountsApi.endpoints

export const {
  useLazyGetAccountsQuery,
  useGetAccountsQuery
} = AccountsApi

