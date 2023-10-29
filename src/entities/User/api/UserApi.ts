import { Api } from "@shared/api/config/Api"
import { ChangeNameDto, ChangePasswordDto, IUserInfo } from "@entities/User/types.ts"
import { DefaultResponse } from "@entities/Auth/types.ts"

export const UserApi = Api.injectEndpoints({

  endpoints: (build) => ({

    GetMe: build.query<IUserInfo, void>({
      query: () => ({
        url: "users/me",
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    ChangeName: build.mutation<DefaultResponse, ChangeNameDto>({
      query: (data) => ({
        url: "users/name",
        method: "PUT",
        data
      }),
      invalidatesTags: ["User"]
    }),

    ChangePassword: build.mutation<DefaultResponse, ChangePasswordDto>({
      query: (data) => ({
        url: "users/password",
        method: "PUT",
        data
      }),
      invalidatesTags: ["User"]
    })


  }),
  overrideExisting: false
})
export const { GetMe } = UserApi.endpoints

export const {
  useLazyGetMeQuery,
  useGetMeQuery,
  useChangeNameMutation,
  useChangePasswordMutation

} = UserApi