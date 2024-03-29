import { Api } from "@shared/api/config/Api.ts"
import {
  CreateTransDto,
  EditTransDto,
  GetTransactionDto,
  GetTransactionResponse,
} from "@entities/Transaction/types.ts"
import { DefaultResponse } from "@entities/Auth/types.ts"

export const TransactionApi = Api.injectEndpoints({
  endpoints: (build) => ({
    GetTransactionsByDateGap: build.query<
      GetTransactionResponse,
      GetTransactionDto
    >({
      query: (transactionDto) => ({
        url: "transaction",
        method: "GET",
        params: transactionDto,
      }),
      providesTags: ["Transactions"],
    }),

    createTransaction: build.mutation<DefaultResponse, CreateTransDto>({
      query: (data) => ({
        url: "transaction",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Transactions", "HistoryPoints", "Accounts"],
    }),

    editTransaction: build.mutation<DefaultResponse, EditTransDto>({
      query: (data) => ({
        url: "transaction",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Transactions", "HistoryPoints", "Accounts"],
    }),

    deleteTransaction: build.mutation<DefaultResponse, number>({
      query: (id) => ({
        url: "transaction/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions", "HistoryPoints", "Accounts"],
    }),
  }),
  overrideExisting: false,
})
// export const {} = TransactionApi.endpoints

export const {
  useGetTransactionsByDateGapQuery,
  useCreateTransactionMutation,
  useEditTransactionMutation,
  useLazyGetTransactionsByDateGapQuery,
  useDeleteTransactionMutation,
} = TransactionApi
