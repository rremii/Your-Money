import { ChartData, ChartOptions } from "chart.js"
import { DateFilter, ICategory, ITransaction } from "@entities/Transaction/types.ts"
import {
  GetConfigOptions,
  GetDatePointsAmount,
  GetLabels,
  GetTransByCategories,
  GetTransByDateUnitWithinCategory
} from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { DayType } from "@shared/helpers/TimeGap.ts"

interface IBarProps {
  options?: ChartOptions<"bar">;
  data: ChartData<"bar">;
}

interface props {
  categories: ICategory[],
  transactions: ITransaction[],
  dateFrom: Date,
  dateTo: Date,
  filter: DateFilter
  firstDay?: DayType
}

export const GetBarConfig = ({ categories, dateTo, dateFrom, filter, transactions, firstDay }: props): IBarProps => {
  const options = GetConfigOptions("Br")


  const datePointsAmount = GetDatePointsAmount(dateFrom, dateTo, filter)

  const labels = GetLabels(dateFrom, dateTo, datePointsAmount, filter, firstDay)

  const transByCategories = GetTransByCategories(categories, transactions)
  const transByDateUnits = GetTransByDateUnitWithinCategory(transByCategories, dateFrom, dateTo, datePointsAmount, filter)


  // const sortedTransactions = transByDateUnits.sort((prev, cur) => {
  //   const prevCategoryQuantity = prev.transactions.reduce((acc, cur) => acc + cur, 0)
  //   const curCategoryQuantity = cur.transactions.reduce((acc, cur) => acc + cur, 0)
  //   return prevCategoryQuantity < curCategoryQuantity ? 1 : -1
  // })

  const data: ChartData<"bar"> = {
    labels,
    datasets: transByDateUnits.map(({ transactions, color, name }) => {
      return {
        backgroundColor: color,
        data: transactions,
        animation: false,
        maxBarThickness: 100

      }

    })
  }


  return {
    data,
    options
  }
}