import React, { FC } from "react"
import { Bar } from "react-chartjs-2"
import styled from "styled-components"
import { ChartData, ChartOptions } from "chart.js"

interface props {
  options?: ChartOptions<"bar">
  data: ChartData<"bar">
}

export const OverviewGraph: FC<props> = React.memo((barConfig) => {
  return (
    <GraphLayout>
      <Bar {...barConfig} />
    </GraphLayout>
  )
})
const GraphLayout = styled.div`
  width: 100%;
  background-color: var(--sub-bg);
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    width: 97% !important;
  }
`
