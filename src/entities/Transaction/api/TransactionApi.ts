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

    createTransaction: build.mutation<DefaultResponse, CreateTransDto>({
      query: (data) => ({
        url: "transaction",
        method: "POST",
        data
      }),
      invalidatesTags: ["Transactions"]
    }),
    deleteTransaction: build.mutation<DefaultResponse, number>({
      query: (id) => ({
        url: "transaction/" + id,
        method: "DELETE"
      }),
      invalidatesTags: ["Transactions", "HistoryPoints"]
    })


  }),
  overrideExisting: false
})
// export const {} = TransactionApi.endpoints

export const {
  useGetTransactionsByDateGapQuery,
  useCreateTransactionMutation,
  useLazyGetTransactionsByDateGapQuery,
  useDeleteTransactionMutation
} = TransactionApi