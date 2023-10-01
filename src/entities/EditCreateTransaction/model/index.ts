import { combineReducers } from "@reduxjs/toolkit"
import { TransactionReducer } from "@entities/EditCreateTransaction/model/TransactionSlice.ts"
import { ChosenCategoryReducer } from "@entities/EditCreateTransaction/model/ChosenCategory.ts"
import { ChosenAccountReducer } from "@entities/EditCreateTransaction/model/ChosenAccount.ts"
import { CalculatorReducer } from "@entities/EditCreateTransaction/model/CalculatorSlice.ts"

export const EditCreateTransactionReducer = combineReducers({
  Transaction: TransactionReducer,
  ChosenCategory: ChosenCategoryReducer,
  ChosenAccount: ChosenAccountReducer,
  Calculator: CalculatorReducer
})