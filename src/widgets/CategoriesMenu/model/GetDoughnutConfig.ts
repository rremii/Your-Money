import { ChartData, ChartOptions } from "chart.js"
import { ICategoryData } from "@widgets/CategoriesMenu/ui/BalanceGraph.tsx"

interface IDoughnutProps {
  options?: ChartOptions<"doughnut">;
  data: ChartData<"doughnut">;
}

export const GetDoughnutConfig = (categories: ICategoryData[]): IDoughnutProps => {


  let data: number[] = []
  let backgroundColor: string[] = []


  categories?.forEach(({ quantity, color }) => {
    data.push(quantity)
    backgroundColor.push(color)
  })

  if (data.reduce((acc, cur) => acc + cur, 0) === 0) {
    data = [1]
    backgroundColor = ["rgba(98,98,98,0.47)"]
  }


  return {
    data: {
      datasets: [{
        data,
        backgroundColor
      }]
    },

    options: {

      cutout: "90%",
      elements: {
        arc: {
          borderWidth: 0
        }
      }
    }

  }
}