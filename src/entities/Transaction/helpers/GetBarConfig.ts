import { ChartData, ChartOptions } from "chart.js"
import { ICategory, ITransaction } from "@entities/Transaction/types.ts"
import ChartDataLabels from "chartjs-plugin-datalabels"

interface IBarProps {
  options?: ChartOptions<"bar">;
  data: ChartData<"bar">;
}


const options: ChartOptions<"bar"> = {
  plugins: {},
  elements: {},

  responsive: true,

  scales: {

    x: {
      // type: "linear",
      // min: new Date("2019-01-01").valueOf(),
      // max: new Date("2019-12-31").valueOf(),
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}

const yearLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
// const monthLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
// const monthLabels: string[] = []
// const monthLabels = new Set<string>()

const weekLabels = []


const GetDatePointsAmount = (dateFrom: Date, dateTo: Date) => {
  const dif = dateTo.getTime() - dateFrom.getTime()

  const dayAmount = dif / (1000 * 60 * 60 * 24)

  return dayAmount
}

export const GetBarConfig = (categories: ICategory[], transactions: ITransaction[], dateFrom: Date, dateTo: Date): IBarProps => {
  const monthLabels: string[] = []


  const transByCategories = categories.map(({ name, color }) => {
    const categoryTransactions = transactions.filter(({ category }) => category === name)
    return {
      name, color, transactions: categoryTransactions
    }
  })

  const dayAmount = GetDatePointsAmount(dateFrom, dateTo)

  const datePointsAmount = dayAmount

  for (let i = 1; i <= dayAmount; i++) {
    monthLabels.push("" + i)
  }

  const curUnit: "month" | "year" = "month"

  const transByDays = transByCategories.map(({ name, color, transactions }) => {
    const curUnitTrans = []

    for (let dateUnitIndex = 0; dateUnitIndex < datePointsAmount; dateUnitIndex++) {

      const year = dateTo.getFullYear()
      const month = dateFrom.getMonth()

      let curDate: Date
      let nextUnitDate: Date

      // @ts-ignore
      if (curUnit === "year") {
        curDate = new Date(year, dateUnitIndex, 0)
        nextUnitDate = new Date(year, dateUnitIndex + 1, 0)
      }
      if (curUnit === "month") {
        curDate = new Date(year, month, dateUnitIndex)
        nextUnitDate = new Date(year, month, dateUnitIndex + 1)
      }


      const transQuantity = transactions.filter(({ date }) => date > curDate && date < nextUnitDate).reduce((acc, cur) => acc + cur.quantity, 0)


      curUnitTrans.push(transQuantity)
    }

    return { transactions: curUnitTrans, name, color }
  })


  const data: ChartData<"bar"> = {
    labels: [...monthLabels],
    datasets: transByDays.map(({ transactions, color, name }) => {


      return {
        backgroundColor: color,

        data: transactions,
        animation: false
      }


    })
  }


  return {
    data,
    options
  }
}