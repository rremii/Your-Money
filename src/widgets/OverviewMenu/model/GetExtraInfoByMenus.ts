import { DateFilter, IConvertedTransaction } from "@entities/Transaction/types.ts"
import { IsDateBetween } from "@shared/helpers/IsDateBetween.ts"
import { timeGap } from "@shared/helpers/TimeGap.ts"
import { transByDate } from "@entities/Transaction/helpers/TransByDate.ts"
import { RoundDecimal } from "@shared/helpers/RoundDecimal.ts"
import { DayType } from "@shared/constants/Days.ts"


export interface IExtraInfo {
  title: string
  quantity: number
}


interface props {
  dateMenuIds: number[]
  allTransactions: IConvertedTransaction[]
  dateFilter: DateFilter
  firstDay: DayType
}

export const GetExtraInfoByMenus = ({ dateFilter, firstDay, allTransactions, dateMenuIds }: props): IExtraInfo[][] => {

  const expenseTransaction = allTransactions.filter((trans) => trans.type === "expense")

  return dateMenuIds.map((menuId) => {
    switch (dateFilter) {
      case "allTime": {
        const { transactions } = transByDate.byAllTime(expenseTransaction, menuId)
        const allTimeQuantity = transactions.reduce((acc, cur) => acc + cur.convertedQuantity, 0)


        const transDays = new Set()
        const transMonths = new Set()
        const transYears = new Set()

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date)
          const { dateGap: dayStr } = timeGap.GetDayGap(0, date)
          transDays.add(dayStr)

          const { dateGap: monthStr } = timeGap.GetMonthGap(0, date)
          transMonths.add(monthStr)

          const { dateGap: yearStr } = timeGap.GetYearGap(0, date)
          transYears.add(yearStr)
        })

        const dayAvgQuantity = RoundDecimal(allTimeQuantity / transDays.size) || 0
        const monthAvgQuantity = RoundDecimal(allTimeQuantity / transMonths.size) || 0
        const yearAvgQuantity = RoundDecimal(allTimeQuantity / transYears.size) || 0

        return [{
          title: "day (avg.)",
          quantity: dayAvgQuantity
        }, {
          title: "month (avg.)",
          quantity: monthAvgQuantity
        }, {
          title: "year (avg.)",
          quantity: yearAvgQuantity
        }]

      }

      case "year": {
        const { transactions } = transByDate.byYear(expenseTransaction, menuId)
        const yearQuantity = transactions.reduce((acc, cur) => acc + cur.convertedQuantity, 0)


        const transDays = new Set()
        const transWeeks = new Set()
        const transMonths = new Set()

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date)

          const { dateGap: dayStr } = timeGap.GetDayGap(0, date)
          transDays.add(dayStr)

          const { dateGap: weekStr } = timeGap.GetWeekGap(firstDay, 0, date)
          transWeeks.add(weekStr)

          const { dateGap: monthStr } = timeGap.GetMonthGap(0, date)
          transMonths.add(monthStr)
        })

        const dayAvgQuantity = RoundDecimal(yearQuantity / transDays.size) || 0
        const weekAvgQuantity = RoundDecimal(yearQuantity / transWeeks.size) || 0
        const monthAvgQuantity = RoundDecimal(yearQuantity / transMonths.size) || 0

        return [{
          title: "day (avg.)",
          quantity: dayAvgQuantity
        }, {
          title: "week (avg.)",
          quantity: weekAvgQuantity
        }, {
          title: "month (avg.)",
          quantity: monthAvgQuantity
        }]
      }
        break
      case "month": {
        const { transactions } = transByDate.byMonth(expenseTransaction, menuId)

        const monthQuantity = transactions.reduce((acc, cur) => acc + cur.convertedQuantity, 0)


        const transDays = new Set()
        const transWeeks = new Set()

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date)

          const { dateGap: dayStr } = timeGap.GetDayGap(0, date)
          transDays.add(dayStr)

          const { dateGap: weekStr } = timeGap.GetWeekGap(firstDay, 0, date)
          transWeeks.add(weekStr)
        })

        const dayAvgQuantity = RoundDecimal(monthQuantity / transDays.size) || 0
        const weekAvgQuantity = RoundDecimal(monthQuantity / transWeeks.size) || 0


        return [{
          title: "day (avg.)",
          quantity: dayAvgQuantity
        }, {
          title: "week (avg.)",
          quantity: weekAvgQuantity
        }, {
          title: "month",
          quantity: monthQuantity
        }]

      }
        break
      case "week": {
        const { transactions } = transByDate.byWeek(expenseTransaction, menuId, firstDay)

        const weekQuantity = transactions.reduce((acc, cur) => acc + cur.convertedQuantity, 0)


        const weekdays = transactions.reduce((acc, cur) => {
          const date = new Date(cur.date)
          if (date.getDay() > 5) return 0 //weekends
          return acc + cur.quantity
        }, 0)


        const transDays = new Set()
        transactions.forEach((transaction) => {
          const date = new Date(transaction.date)
          const { dateGap: dayStr } = timeGap.GetDayGap(0, date)
          transDays.add(dayStr)
        })

        const dayAvgQuantity = RoundDecimal(weekQuantity / transDays.size) || 0

        return [{
          title: "day (avg.)",
          quantity: dayAvgQuantity
        }, {
          title: "weekdays",
          quantity: weekdays
        }, {
          title: "week",
          quantity: weekQuantity
        }]
      }
        break
      case "day": {
        const { dateTo, dateFrom, transactions: dayTransactions } = transByDate.byDay(expenseTransaction, menuId)
        const week = timeGap.GetWeekGap(firstDay, 0, dateTo)
        const month = timeGap.GetMonthGap(0, dateFrom)


        const dayQuantity = dayTransactions
          .reduce((acc, cur) => acc + cur.convertedQuantity, 0)

        const weekQuantity = allTransactions
          .filter(({ date }) => IsDateBetween(week.dateFrom, new Date(date), week.dateTo, "left"))
          .reduce((acc, cur) => acc + cur.convertedQuantity, 0)

        const monthQuantity = allTransactions
          .filter(({ date }) => IsDateBetween(month.dateFrom, new Date(date), month.dateTo, "left"))
          .reduce((acc, cur) => acc + cur.convertedQuantity, 0)

        return [{
          title: "day",
          quantity: dayQuantity
        }, {
          title: "week",
          quantity: weekQuantity
        }, {
          title: "month",
          quantity: monthQuantity
        }]


      }
    }
  })
}