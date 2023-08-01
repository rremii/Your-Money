import { Api } from "@shared/api/config/Api"
import { ChangeName, ChangePassword, IUserInfo } from "@entities/User/types.ts"
import { DefaultResponse } from "@entities/Auth/types.ts"

// export const TransactionApi = Api.injectEndpoints({

// endpoints: (build) => ({

// GetMe: build.query<IUserInfo, void>({
//   query: () => ({
//     url: "users/me",
//     method: "GET"
//   }),
//   providesTags: ["User"]
// }),
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

// }),
// overrideExisting: false
// })
// export const {} = TransactionApi.endpoints

// export const {
// useLazyGetMeQuery,
// useGetMeQuery,
// useChangeNameMutation,
// useChangePasswordMutation

// } = TransactionApi