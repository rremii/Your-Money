import { Api } from "@shared/api/config/Api.ts"
import { CreateCategoryDto, EditCategoryDto, ICategory } from "@entities/Category/type.ts"

export const CategoriesApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetCategories: build.query<ICategory[], number | undefined>({
      query: (userId) => ({
        url: "category",
        method: "GET",
        params: { userId }
      }),
      providesTags: ["Categories"]
    }),
    CreateCategory: build.mutation<ICategory, CreateCategoryDto>({
      query: (createCategoryDto) => ({
        url: "category",
        method: "POST",
        data: createCategoryDto
      }),
      invalidatesTags: ["Categories"]
    }),
    EditCategory: build.mutation<ICategory, EditCategoryDto>({
      query: (editCategoryDto) => ({
        url: "category",
        method: "PUT",
        data: editCategoryDto
      }),
      invalidatesTags: ["Categories"]
    }),
    DeleteCategory: build.mutation<ICategory, number>({
      query: (id) => ({
        url: "category/" + id,
        method: "DELETE"
      }),
      invalidatesTags: ["Categories"]
    })


  }),
  overrideExisting: false
})

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation
} = CategoriesApi