import { DateBox } from "@widgets/TransactionsMenu/ui/DateBox.tsx"
import { Transaction } from "@widgets/TransactionsMenu/ui/Transaction.tsx"
import React, { FC } from "react"
import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { SumAllTransactions } from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"

interface props {
  date: Date;
  transactions: IConvertedTransaction[];
}

export const TransactionSectionByDate: FC<props> = React.memo(({ date, transactions }) => {


  const sectionBalance = SumAllTransactions(transactions)

  let dateBalance = 0
  transactions.forEach(({ quantity }) => {
    dateBalance -= quantity
  })

  return <>
    <DateBox date={date} dateBalance={sectionBalance} />
    {transactions.sort((prev, cur) => prev.date < cur.date ? 1 : -1).map((transactionData) => (
      <Transaction key={transactionData.id} {...transactionData} />
    ))}
  </>
})
