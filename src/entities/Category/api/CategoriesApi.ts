import { Api } from "@shared/api/config/Api.ts"
import { IAccount } from "@entities/Account/constants/Accounts.ts"
import { ICategory } from "@entities/Transaction/types.ts"

export const CategoriesApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetCategories: build.query<ICategory[], number | undefined>({
      query: (userId) => ({
        url: "category",
        method: "GET",
        params: { userId }
      }),
      providesTags: ["Categories"]
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
  useGetCategories
} = CategoriesApi