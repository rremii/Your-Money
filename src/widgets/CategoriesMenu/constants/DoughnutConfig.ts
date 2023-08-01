import { ChartData, ChartOptions } from "chart.js"

interface IDoughnutProps {
  options?: ChartOptions<"doughnut">;
  data: ChartData<"doughnut">;
}


export const DoughnutProps: IDoughnutProps = {
  data: {
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)"
      ]
    }]
  },
  options: {
    cutout: 85,
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

}
