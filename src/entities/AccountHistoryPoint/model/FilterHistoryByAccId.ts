import { IAccountHistoryPoint } from "@entities/AccountHistoryPoint/types.ts"

export const FilterHistoryByAccId = (initialHistory: IAccountHistoryPoint[], curAccId: number | null) => {
  let history = initialHistory || []

  if (curAccId) {
    history = initialHistory?.filter(({ accountId }) => accountId === curAccId) || []
  }

  return history
}