import { Api } from "@shared/api/config/Api.ts"
import { GetTransactionDto } from "@entities/Transaction/types.ts"
import { GetHistoryPointsResponse } from "@entities/AccountHistoryPoint/types.ts"

export const TransactionApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetHistoryPointsByDateGap: build.query<GetHistoryPointsResponse, GetTransactionDto>({
      query: (historyPointsDto) => ({
        url: "account-history",
        method: "GET",
        params: historyPointsDto
      }),
      providesTags: ["HistoryPoints"]
    })


  }),
  overrideExisting: false
})

export const {
  useGetHistoryPointsByDateGapQuery
} = TransactionApi