import { DateBox } from "@widgets/TransactionsMenu/ui/DateBox.tsx"
import { Transaction } from "@widgets/TransactionsMenu/ui/Transaction.tsx"
import React, { FC } from "react"
import { ITransaction } from "@entities/Transaction/types.ts"

interface props {
  date: Date;
  transactions: ITransaction[];
}

export const TransactionSectionByDate: FC<props> = ({ date, transactions }) => {

  let dateBalance = 0
  transactions.forEach(({ quantity }) => {
    dateBalance -= quantity
  })

  return <>
    <DateBox date={date} dateBalance={dateBalance} />
    {transactions.map((transactionData) => (
      <Transaction key={transactionData.id} {...transactionData} />
    ))}
  </>
}
