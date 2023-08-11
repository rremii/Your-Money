import { ChartData, ChartOptions } from "chart.js"
import { ICategory, ITransaction } from "@entities/Transaction/types.ts"

interface IBarProps {
  options?: ChartOptions<"bar">;
  data: ChartData<"bar">;
}


const options: ChartOptions<"bar"> = {
  plugins: {},
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}


export const GetBarConfig = (categories: ICategory[], transactions: ITransaction[]): IBarProps => {


  const yearLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]


  const transByCategories = categories.map(({ name, color }) => {

    const categoryTransactions = transactions.filter(({ category }) => category === name)
    return {
      name, color, transactions: categoryTransactions
    }
  })


  // const yearDays = []

  const transByDays = transByCategories.map(({ name, color, transactions }) => {
    const curMonthTransactions = []

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const now = new Date()
      const curDate = new Date(now.getFullYear(), monthIndex, 0)
      const nextMonthDate = new Date(now.getFullYear(), monthIndex + 1, 0)

      const transQuantity = transactions.filter(({ date }) => date > curDate && date < nextMonthDate).reduce((acc, cur) => acc + cur.quantity, 0)

      if (transactions && transQuantity && transQuantity !== 0) {
        // debugger
      }

      curMonthTransactions.push(transQuantity)
    }

    return { transactions: curMonthTransactions, name, color }
  })
  // if (transactions.length !== 0) {
  //   debugger
  // }

  const data: ChartData<"bar"> = {
    labels: yearLabels,
    datasets: transByDays.map(({ transactions, color, name }) => {

      return {
        backgroundColor: color,
        data: transactions
      }


    })
    // datasets: [
    //   {
    //     data: yearLabels.map(() => 10),
    //     backgroundColor: "rgb(255, 99, 132)"
    //   },
    //   {
    //     data: yearLabels.map(() => 20),
    //     backgroundColor: "rgb(75, 192, 192)"
    //   },
    //   {
    //     data: yearLabels.map(() => 30),
    //     backgroundColor: "rgb(53, 162, 235)"
    //   }
    // ]
  }


  // debugger
  return {
    data,
    options
  }
}