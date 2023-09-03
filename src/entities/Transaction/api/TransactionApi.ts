import { Api } from "@shared/api/config/Api.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { CreateTransactionDto, ICategory, ITransaction } from "@entities/Transaction/types.ts"

export const TransactionApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetTransactionsByDateGap: build.query<ITransaction[], CreateTransactionDto>({
      query: (transactionDto) => ({
        url: "transaction",
        method: "GET",
        params: transactionDto
      }),
      providesTags: ["Transactions"]
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

export const {
  useGetTransactionsByDateGapQuery
} = TransactionApi