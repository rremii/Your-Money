import { Api } from "@shared/api/config/Api.ts"
import { GetTransactionDto, ITransaction } from "@entities/Transaction/types.ts"
import { DefaultResponse } from "@entities/Auth/types.ts"
import { CreateTransDto } from "@entities/Transaction/types.ts"

//todo create historyAccountPoint module
export const TransactionApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetTransactionsByDateGap: build.query<ITransaction[], GetTransactionDto>({
      query: (transactionDto) => ({
        url: "transaction",
        method: "GET",
        params: transactionDto
      }),
      providesTags: ["Transactions"]
    }),

    // GetTransactionsByDateGap: build.query<ITransaction[], GetTransactionDto>({
    //   query: (transactionDto) => ({
    //     url: "transaction",
    //     method: "GET",
    //     params: transactionDto
    //   }),
    //   providesTags: ["Transactions"]
    // }),


    createTransaction: build.mutation<DefaultResponse, CreateTransDto>({
      query: (data) => ({
        url: "transaction",
        method: "POST",
        data
      }),
      invalidatesTags: ["User"]
    })
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
  useGetTransactionsByDateGapQuery,
  useCreateTransactionMutation,
  useLazyGetTransactionsByDateGapQuery
} = TransactionApi