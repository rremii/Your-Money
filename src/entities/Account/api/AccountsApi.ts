import { Api } from "@shared/api/config/Api.ts"
import {
  AccountResponse,
  CreateAccountDto,
  EditAccountDto,
} from "@entities/Account/types.ts"
import {
  CreateCategoryDto,
  EditCategoryDto,
  ICategory,
} from "@entities/Category/type.ts"

export const AccountsApi = Api.injectEndpoints({
  endpoints: (build) => ({
    GetAccounts: build.query<AccountResponse[], number | undefined>({
      query: (userId) => ({
        url: "account",
        method: "GET",
        params: { userId },
      }),
      providesTags: ["Accounts"],
    }),
    CreateAccount: build.mutation<ICategory, CreateAccountDto>({
      query: (createAccountDto) => ({
        url: "account",
        method: "POST",
        data: createAccountDto,
      }),
      invalidatesTags: ["Accounts"],
    }),
    EditAccount: build.mutation<ICategory, EditAccountDto>({
      query: (editAccountDto) => ({
        url: "account",
        method: "PUT",
        data: editAccountDto,
      }),
      invalidatesTags: ["Accounts"],
    }),
    DeleteAccount: build.mutation<ICategory, number>({
      query: (id) => ({
        url: "account/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Accounts", "Transactions", "HistoryPoints"],
    }),
  }),
  overrideExisting: false,
})

export const { GetAccounts } = AccountsApi.endpoints

export const {
  useGetAccountsQuery,
  useDeleteAccountMutation,
  useCreateAccountMutation,
  useEditAccountMutation,
} = AccountsApi
