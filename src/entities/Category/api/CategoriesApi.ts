import { Api } from "@shared/api/config/Api.ts"
import { ICategory } from "@entities/Category/type.ts"

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


  }),
  overrideExisting: false
})

export const {
  useGetCategoriesQuery
} = CategoriesApi