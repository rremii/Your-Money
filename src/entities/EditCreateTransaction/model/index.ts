import { combineReducers } from "@reduxjs/toolkit"
import { TransactionReducer } from "@entities/EditTransaction/model/TransactionSlice.ts"
import { ChosenCategoryReducer } from "@entities/EditTransaction/model/ChosenCategory.ts"
import { ChosenAccountReducer } from "@entities/EditTransaction/model/ChosenAccount.ts"

export const EditCreateTransactionReducer = combineReducers({
  Transaction: TransactionReducer,
  ChosenCategory: ChosenCategoryReducer,
  ChosenAccount: ChosenAccountReducer
})