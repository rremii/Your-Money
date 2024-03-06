import { DateBox } from "@widgets/TransactionsMenu/ui/DateBox.tsx"
import { Transaction } from "@widgets/TransactionsMenu/ui/Transaction.tsx"
import React, { FC } from "react"
import { IConvertedTransaction } from "@entities/Transaction/types.ts"
import { SumAllTransactions } from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useTranslation } from "react-i18next"

interface props {
  date: Date
  transactions: IConvertedTransaction[]
}

export const TransactionSectionByDate: FC<props> = React.memo(
  ({ date, transactions }) => {
    const currencyFormat = useTypedSelector(
      (state) => state.Settings.currencyFormat,
    )
    const currencySign = useTypedSelector(
      (state) => state.Settings.curCurrencySign,
    )

    const sectionBalance = SumAllTransactions(transactions)

    let dateBalance = 0
    transactions.forEach(({ quantity }) => {
      dateBalance -= quantity
    })

    return (
      <>
        <DateBox
          formatStr={currencyFormat}
          currencySign={currencySign}
          date={date}
          dateBalance={sectionBalance}
        />
        {transactions
          .sort((prev, cur) => (prev.date < cur.date ? 1 : -1))
          .map((transactionData) => (
            <Transaction key={transactionData.id} {...transactionData} />
          ))}
      </>
    )
  },
)
