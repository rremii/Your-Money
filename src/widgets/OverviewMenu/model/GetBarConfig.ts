import { ChartData, ChartOptions } from "chart.js"
import { DateFilter, ITransaction } from "@entities/Transaction/types.ts"
import {
  GetConfigOptions,
  GetDatePointsAmount,
  GetLabels,
  GetTransByCategories,
  GetTransByDateUnitWithinCategory
} from "@widgets/OverviewMenu/model/dataTransformHelpers.ts"
import { ICategory } from "@entities/Category/type.ts"
import { DayType } from "@shared/constants/Days.ts"

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