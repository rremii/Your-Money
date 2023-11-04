// import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { DateFilter } from "@entities/Transaction/types.ts"
// import { RootState } from "@shared/store/store.ts"
// import { DayType } from "@shared/constants/Days.ts"
// import { base } from "money"
//
//
// export const fetchCurrency = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async () => {
//     const response = await currencyApi.fetchCurrency()
//     return response.data
//   }
// )
//
// interface initialState {
//   isTriggered: boolean
//   base: string
//   rates: IRate[]
// }
//
// const initialState = {
//   base: "RUB",
//   rates: [],
//   isTriggered: false
// } as initialState
//
// //todo delete all
// const CurrencySlice = createSlice({
//   name: "CurrencySlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchCurrency.fulfilled, (state, action) => {
//       state.base = action.payload.base
//       state.rates = action.payload.rates
//     })
//     builder.addCase(fetchCurrency.pending, (state) => {
//       state.isTriggered = true
//     })
//   }
// })
//
// export const CurrencyReducer = CurrencySlice.reducer
// export const {} = CurrencySlice.actions
//
