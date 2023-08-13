import { ChartOptions } from "chart.js"
import { DateFilter, ICategory, ITransaction, TransCategories } from "@entities/Transaction/types.ts"
import { Days, DayType, FullDays } from "@shared/helpers/TimeGap.ts"

export const GetConfigOptions = (currency: string = "$"): ChartOptions<"bar"> => {

  return {
    plugins: {},
    elements: {},
    responsive: true,
    maintainAspectRatio: false,

    scales: {

      x: {
        stacked: true,
        ticks: {
          autoSkip: false,
          maxRotation: 0

        },
        grid: {
          // display: false,
          lineWidth: 0,
          drawTicks: true,
          tickWidth: 1
        }
      },

      y: {
        ticks: {
          labelOffset: 10,
          crossAlign: "near",
          stepSize: 20,
          count: 5,
          callback: function(value, index, ticks) {
            if (value === 0) return ""
            return currency + " " + value
          }
        },

        stacked: true
      }
    }
  }
}
export const GetDatePointsAmount = (dateFrom: Date, dateTo: Date) => {
  const dif = dateTo.getTime() - dateFrom.getTime()

  const dayAmount = dif / (1000 * 60 * 60 * 24)

  return dayAmount
}

export const GetTransByCategories = (categories: ICategory[], transactions: ITransaction[]) => {
  return categories.map(({ name, color }) => {
    const categoryTransactions = transactions.filter(({ category }) => category === name)
    return {
      name, color, transactions: categoryTransactions
    }
  })
}

interface tranByCategories {
  name: TransCategories
  color: string
  transactions: ITransaction[]
}

export const GetTransByDateUnitWithinCategory = (transByCategories: tranByCategories[], dateFrom: Date, dateTo: Date, datePointsAmount: number, filter: DateFilter) => {


  return transByCategories.map(({ name, color, transactions }) => {
    const curUnitTrans = []

    for (let dateUnitIndex = 0; dateUnitIndex < datePointsAmount; dateUnitIndex++) {

      const year = dateTo.getFullYear()
      const month = dateFrom.getMonth()
      const date = dateFrom.getDate()

      let curDate: Date
      let nextUnitDate: Date

      switch (filter) {
        case "day":
          curDate = new Date(year, month, date + dateUnitIndex)
          nextUnitDate = new Date(year, month, date + dateUnitIndex + 1)
          break
        case "week":
          curDate = new Date(year, month, date + dateUnitIndex)
          nextUnitDate = new Date(year, month, date + dateUnitIndex + 1)
          break
        case "month":
          curDate = new Date(year, month, dateUnitIndex)
          nextUnitDate = new Date(year, month, dateUnitIndex + 1)
          break
        case "year":
          curDate = new Date(year, dateUnitIndex, 0)
          nextUnitDate = new Date(year, dateUnitIndex + 1, 0)
          break
      }


      const transQuantity = transactions.filter(({ date }) => date > curDate && date < nextUnitDate).reduce((acc, cur) => acc + cur.quantity, 0)


      curUnitTrans.push(transQuantity)
    }

    return { transactions: curUnitTrans, name, color }
  })
}


const yearLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
const weekLabels = ["S", "M", "T", "W", "T", "F", "S"]

export const GetLabels = (dateFrom: Date, dateTo: Date, datePointsAmount: number, filter: DateFilter, firstDay?: DayType) => {
  let labels: string[] = []

  switch (filter) {
    case "day": {
      const day = FullDays.get(dateFrom.getDay()) as string
      labels = [day]
    }
      break
    case "month":
      for (let i = 1; i <= datePointsAmount; i++) {
        if (i % 4 === 0 || i === 1 || i === datePointsAmount) {
          labels.push(i + "")
        } else {
          labels.push("")
        }
      }
      break
    case "week": {
      if (!firstDay) return labels = weekLabels
      const dayId = Days.get(firstDay) as number

      const shiftedDaysLeft = weekLabels.slice(0, dayId)
      const shiftedDaysRight = weekLabels.slice(dayId + 1, 7)

      labels = [weekLabels[dayId], ...shiftedDaysRight, ...shiftedDaysLeft]
      break
    }
    case "year":
      labels = yearLabels
  }


  return labels
}