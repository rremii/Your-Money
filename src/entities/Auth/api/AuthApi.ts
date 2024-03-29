import { Api } from "@shared/api/config/Api"
import { AuthResponse, DefaultResponse, LoginDto } from "@entities/Auth/types"

export const AuthApi = Api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, FormData>({
      query: (registerData) => ({
        url: "auth/register",
        method: "POST",
        data: registerData,
      }),
    }),
    login: build.mutation<AuthResponse, LoginDto>({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        data: loginData,
      }),
    }),

    confirmEmail: build.mutation<DefaultResponse, string>({
      query: (email) => ({
        url: "confirm-code/send-code",
        method: "POST",
        data: { email },
      }),
    }),

    verifyCode: build.mutation<DefaultResponse, string>({
      query: (code) => ({
        url: "confirm-code/verify-code",
        method: "POST",
        data: { code },
      }),
    }),
    signOut: build.mutation<DefaultResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "DELETE",
      }),
    }),

    refresh: build.query<AuthResponse, void>({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})
export const { refresh } = AuthApi.endpoints
export const {
  useRefreshQuery,

  useRegisterMutation,
  useLoginMutation,
  useConfirmEmailMutation,
  useVerifyCodeMutation,
  useSignOutMutation
} = AuthApi