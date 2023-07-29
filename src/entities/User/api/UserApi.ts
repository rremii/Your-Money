import { Api } from "@shared/api/config/Api"
import { IUserInfo } from "@entities/User/types.ts"

export const UserApi = Api.injectEndpoints({

  endpoints: (build) => ({
    //
    // register: build.mutation<AuthResponse, RegisterDto>({
    //   query: (registerData) => ({
    //     url: "auth/register",
    //     method: "POST",
    //     data: registerData
    //   })
    //
    // }),
    // login: build.mutation<AuthResponse, LoginDto>({
    //   query: (loginData) => ({
    //     url: "auth/login",
    //     method: "POST",
    //     data: loginData
    //   })
    // }),
    //
    // confirmEmail: build.mutation<DefaultResponse, string>({
    //   query: (email) => ({
    //     url: "confirm-code/send-code",
    //     method: "POST",
    //     data: { email }
    //   })
    // }),
    //
    // verifyCode: build.mutation<DefaultResponse, string>({
    //   query: (code) => ({
    //     url: "confirm-code/verify-code",
    //     method: "POST",
    //     data: { code }
    //   })
    // }),
    // signOut: build.mutation<DefaultResponse, void>({
    //   query: () => ({
    //     url: "auth/logout",
    //     method: "DELETE"
    //   })
    // }),

    GetMe: build.query<IUserInfo, void>({
      query: () => ({
        url: "users/me",
        method: "GET"
      })


    })


  }),
  overrideExisting: false
})
// export const { refresh } = AuthApi.endpoints
export const {
  useLazyGetMeQuery, useGetMeQuery
} = UserApi